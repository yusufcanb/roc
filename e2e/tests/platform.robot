*** Settings ***
Documentation     Verifies the features of the ROC

Default Tags      platform
Resource          ../resources/docker.resource

*** Variables ***
${DEBUG}          False

*** Test Cases ***

Verify ROC is Deployed Successfully
    Log  Done!

*** Keywords ***

Setup Test Deployment
    [Arguments]    ${compose_file}
    IF    ${DEBUG}
        Log    Skipping compose deployment
    ELSE
        Deploy ROC    ${compose_file}
    END

Destroy Test Deployment
    [Arguments]    ${compose_file}
    IF    ${DEBUG}
        Log    Skip removing deployment
    ELSE
        Destroy ROC    ${compose_file}
    END
