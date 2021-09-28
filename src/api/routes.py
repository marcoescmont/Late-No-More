"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Profile, Messages_author, Messages_recipient, Shift, Employee
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import datetime
import pytz
from api.emailSender import emailSender

api = Blueprint('api', __name__)



##Profile



@api.route('/profile', methods=['GET'])
@jwt_required()
def handle_profile():
    profile_id = get_jwt_identity()
    profile = Profile.query.get(profile_id)
    return jsonify(profile.serialize()), 200

@api.route('/profile', methods=['POST'])
def create_profile():
    body = request.get_json()
    profile = Profile()

    if "name" in body:
        profile.name = body["name"]
    if "last_name" in body:
        profile.last_name = body["last_name"]
    if "username" in body:
        profile.username = body["username"]
    if "phone_number" in body:
        profile.phone_number = body["phone_number"]
    if "email" in body:
        profile.email = body["email"]
    if "password" in body:
        profile.password = body["password"]
    

    db.session.add(profile)
    db.session.commit()
    return jsonify(profile.serialize())

@api.route('/profile/', methods=['PUT'])
@jwt_required()
def update_profile():
    profile_id = get_jwt_identity()
    profile1 = Profile.query.get(profile_id)
    body = request.get_json()
    if profile1 is None:
        raise APIException('User not found', status_code=404)

    if "name" in body:
        profile1.name = body["name"]
    if "last_name" in body:
        profile1.last_name = body["last_name"]
    if "username" in body:
        profile1.username = body["username"]
    if "phone_number" in body:
        profile1.phone_number = body["phone_number"]
    if "email" in body:
        profile1.email = body["email"]
    
    db.session.commit()
    return jsonify(profile1.serialize())



##Shift



@api.route('/shift', methods=['GET'])
@jwt_required()
def handle_shift():
    shifts = Shift.query.all()
    mapped_shifts=[s.serialize() for s in shifts]
    return jsonify(mapped_shifts), 200

@api.route('/shift/<int:shift_id>', methods=['GET'])
@jwt_required()
def handle_single_shift(shift_id):
    shifts = Shift.query.get(shift_id)
    shifts = shifts.serialize()
    return jsonify(shifts), 200

@api.route('/shift', methods=['POST'])
@jwt_required()
def post_shift():
    body = request.get_json()

    shift = Shift()

    if "role_id" in body:
        shift.role_id = body["role_id"]
    if "profile_id" in body:
        shift.profile_id = body["profile_id"]
    if "starting_time" in body:
        shift.starting_time = body["starting_time"]
    if "ending_time" in body:
        shift.ending_time = body["ending_time"]
    
    db.session.add(shift)
    db.session.commit()
    get_all_shifts = Shift.query.all()
    mapped_shifts=[s.serialize() for s in get_all_shifts]
    return jsonify(mapped_shifts)

@api.route('/shift/<int:shift_id>', methods=['PUT'])
# @jwt_required()
def put_shift(shift_id):
    body = request.get_json()

    shift = Shift.query.filter_by(id = shift_id)

    if "role_id" in body:
        shift.role_id = body["role_id"]
    if "starting_time" in body:
        shift.starting_time = body["starting_time"]
    if "ending_time" in body:
        shift.ending_time = body["ending_time"]
    
    db.session.commit()
    return jsonify(shift.serialize())

@api.route('/shift/<int:shift_id>/CI', methods=['PUT'])
@jwt_required()
def update_single_shift_clock_in(shift_id):
    body = request.get_json()
    shift = Shift.query.get(shift_id)
    current_user_id = get_jwt_identity()
    current_user_id_role = Profile.query.get(current_user_id)
    IST = pytz.timezone('America/New_York')
    UTC = pytz.utc

    if shift is None:
        raise APIException('Shift not found', status_code=404)

    if shift.clock_in is not None:
        return 'Clock in already done', 400

    shift.clock_in = datetime.datetime.utcnow()
    
    db.session.commit()
    return jsonify(shift.serialize())

@api.route('/shift/<int:shift_id>/CO', methods=['PUT'])
@jwt_required()
def update_single_shift_clock_out(shift_id):
    body = request.get_json()
    shift = Shift.query.get(shift_id)
    current_user_id = get_jwt_identity()
    current_user_id_role = Profile.query.get(current_user_id)
    IST = pytz.timezone('America/New_York')
    UTC = pytz.utc

    print(datetime.datetime.now(IST))

    if shift is None:
        raise APIException('Shift not found', status_code=404)

    if shift.clock_out is not None:
        return 'Clock out already done', 400

    shift.clock_out = datetime.datetime.now(UTC)

    db.session.commit()
    return jsonify(shift.serialize())

@api.route('/shift/<int:shift_id>', methods=['DELETE'])
def delete_shift(shift_id):
    shift1 = Shift.query.get(shift_id)
    
    db.session.delete(shift1)
    db.session.commit()

    get_all_shifts = Shift.query.all()
    mapped_shifts=[s.serialize() for s in get_all_shifts]
    return jsonify(mapped_shifts)


##Employee



@api.route('/employee', methods=['GET'])
@jwt_required()
def handle_employee():
    employees = Employee.query.all()
    mapped_employees=[p.serialize() for p in employees]
    return jsonify(mapped_employees), 200

@api.route('/employee/<int:employee_id>', methods=['GET'])
@jwt_required()
def handle_single_employee(employee_id):
    employees = Employee.query.get(employee_id)
    employees = employees.serialize()
    return jsonify(employees), 200

@api.route('/employee', methods=['POST'])
@jwt_required()
def create_employee():
    body = request.get_json()
    role = body["role"]
    hourly_rate = body["hourly_rate"]

    employee = Employee()

    if role:
        employee.role = role
    if hourly_rate:
        employee.hourly_rate = hourly_rate
    

    db.session.add(employee)
    db.session.commit()
    return jsonify(employee.serialize())

@api.route('/employee/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    employee1 = Employee.query.get(employee_id)
    if employee1 is None:
        raise APIException('User not found', status_code=404)

    if "role" in body:
        employee1.username = body["role"]

    if "hourly_rate" in body:
        employee1.hourly_rate = body["hourly_rate"]

    db.session.commit()
    return jsonify(employee1.serialize())

@api.route('/employee/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    employee1 = Employee.query.get(employee_id)
    
    db.session.delete(employee1)
    db.session.commit()

    get_all_employees = Employee.query.all()
    mapped_employees=[e.serialize() for e in get_all_employees]
    return jsonify(mapped_employees)



##Login



@api.route("/login", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = Profile.query.filter_by(username=username, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    

    emailSender(user.email)
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })



##Messages author



@api.route('/messages-author', methods=['GET'])
@jwt_required()
def handle_messages_author():
    messages = Messages_author.query.all()
    mapped_messages=[m.serialize() for m in messages]
    return jsonify(mapped_messages), 200

@api.route('/messages-author/<int:messages_id>', methods=['GET'])
@jwt_required()
def handle_single_message_author(messages_id):
    messages = Messages_author.query.get(messages_id)
    messages = messages.serialize()
    return jsonify(messages), 200

##Messages recipient

@api.route('/messages-recipient', methods=['GET'])
@jwt_required()
def handle_messages_recipient():
    messages = Messages_recipient.query.all()
    mapped_messages=[m.serialize() for m in messages]
    return jsonify(mapped_messages), 200

@api.route('/messages-recipient/<int:messages_id>', methods=['GET'])
@jwt_required()
def handle_single_message_recipient(messages_id):
    messages = Messages_recipient.query.get(messages_id)
    messages = messages.serialize()
    return jsonify(messages), 200