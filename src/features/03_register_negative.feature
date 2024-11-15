# Feature: Register a player with invalid details

#   Scenario: Attempt to register a new player with missing username
#     Given I have the player registration details with missing username
#     When I send a POST request to create a new player with invalid details
#     Then I should see a registration error message "Invalid Username"
