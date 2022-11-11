*** Settings ***
Library           Process
Library           RedisLibrary
Library           RequestsLibrary
Library           OperatingSystem
Library           Collections


*** Keywords ***
Get JSON Resource as Dictionary
    [Arguments]    ${file}
    ${json_str}=    Get Binary File    ${ROBOT_RESOURCE_DIR}${/}${file}
    ${json_dict}=    Evaluate    json.loads('''${json_str}''')    json
    [Return]    ${json_dict}

Log Response Body
    [Arguments]    ${response_obj}
    Log    ${response_obj.text}
