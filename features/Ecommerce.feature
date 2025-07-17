Feature: Ecommerce validations
@Regression
  Scenario Outline: Placing the order
    Given a login to application1 with "<username>" and "<password>"
    When Add "zara coat 3" to Cart
    Then Verify "zara coat 3" is displayed in the Cart
    When Enter valid details and Place the order
    Then Verify order in the Order History

    Examples:
        | username             | password    |
        | kaung79@hotmail.com  | Totetote01  |
        | anshika@gmail.com    | Iamking@000 |

@Validation
  Scenario Outline: Placing the order
    Given a login to application2 with "<username>" and "<password>"
    Then Verify Error message is displayed
	
Examples:
    | username             | password     |
    | kaung79@hotmail.com  | Totetote011  |
    | hello@123.com        | Iamhello@12 |        