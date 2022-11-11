*** Settings ***
Documentation     Includes Docker and Docker Compose related keywords
Resource          common.resource

*** Keywords ***
Deploy ROC
    [Documentation]    Deploys IoTC Integration using docker-compose
    [Arguments]   ${compose_file}=docker-compose.yaml
    ${proc}=    Run Process    docker-compose -f e2e/${compose_file} up -d && sleep 2    shell=True    stderr=STDOUT
    Log    ${proc.stdout}
    Sleep    10s
    [Return]    ${proc}

Destroy ROC
    [Documentation]    Destroy IoTC deployment
    [Arguments]   ${compose_file}=docker-compose.yaml
    ${proc}=    Run Process    docker-compose -f e2e/${compose_file} down    shell=True    stderr=STDOUT
    Log    ${proc.stdout}
    [Return]    ${proc}
