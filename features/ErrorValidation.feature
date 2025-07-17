Feature: Ecommerce validations
@Validation
  Scenario Outline: Placing the order
    Given a login to application2 with "<username>" and "<password>"
    Then Verify Error message is displayed
	
Examples:
    | username             | password     |
    | kaung79@hotmail.com  | Totetote011  |
    | hello@123.com        | Iamhello@12 |