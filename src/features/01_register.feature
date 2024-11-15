@dev

Feature: New users should be able to register and login with their newly registered user

 Scenario: New users can be registrated on the platform
    
    Given I have the player registration details
    Given I send a POST request to create a new player
    Then I should receive a 200 response for registration
    When I send a POST request to log in the newly registered player
    Then I should receive a 200 response for login
    And Login with newly registered user should be successful

    