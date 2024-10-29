Feature: Log in the registered player

  Scenario: Log in the registered player with valid credentials
    Given I have the login details
    | field    | value    |
    | password | B2Btests |
    When I send a POST request to log in the player
    Then I should receive a 200 response for login
    And the login should be successful
