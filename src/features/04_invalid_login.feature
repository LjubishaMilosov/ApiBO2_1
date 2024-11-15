# Feature: Invalid Login Attempt

#   Scenario: Attempt to log in with invalid credentials
#     Given I have the following invalid login details
#       | username  | password      |
#       | wrongUser | wrongPassword |
#     When I send a POST request to log in the player with invalid credentials
#     Then I should see a login error message "Invalid Login Details."
