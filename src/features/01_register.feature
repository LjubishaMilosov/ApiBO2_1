Feature: Register a new player

  Scenario: Register a new player
    Given I have the player registration details
    When I send a POST request to create a new player
    Then I should receive a 200 response for registration
    And I store the username for later use

