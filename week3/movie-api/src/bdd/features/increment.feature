Feature: incrementer
    Scenario: increment by 1
        Given I have a variable with value 1
        When I increment by value 1
        Then I should get 2



    Scenario: increment by 5
        Given I have a variable with value 1
        When I increment by value 5
        Then I should get 6


    Scenario: increment by -5
        Given I have a variable with value 1
        When I increment by value -5
        Then I should get -4
# or an exception, however we want it to fuction

