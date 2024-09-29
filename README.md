# Love-Token-Adviser

## 1. Project Overview
- Target Audience: Couples looking for gift ideas and date outfit suggestions
- Main Features: 
	Gift recommendations
	Outfit suggestions for dates
	Date spot suggetions for place(On hold)

## 2. User Personas
- [Describe 2-3 typical user personas]

## 3. User Journey

```
    - Home
	|- SignUp
	     |- AccountRegistrationWindow(Return-UserTopPage)
   	|- Login
	     |- UserTopPage
		     	|- Gift recommendations
			       	|- UserInputPage (To, Age(20 fix), PriceRange)
				|- SuggetionPage (Category, Price, Ranking)
				|- ConclusionPage (Like cart)
			|- Outfit suggestions for dates
				|- UserInputPage (User: Age(20 fix), PriceRange, Place, DateDay)(AutoFill: Wether)
			 	|- SuggetionPage (Category, Price, Ranking)
			 	|- ConclusionPage (Like cart)
```

## 4. Features and Functionality
### 3.1 Gift Recommender
- 

### 3.2 Date Outfit Suggester
- 

## 5. Technical Architecture
- frontend : react.js
- backend : django
- style : tailwind

## 6. Data Models
	1. User
	- Fields:
	    - id: Integer (Primary Key)
	    - username: String (Unique)
	    - email: String (Unique)
	    - password: String
	    - signup_date: DateTime
	    - is_active: Boolean (default=True)
	    - last_login: DateTime
	2. Gift
	- Fields:
	    - id: Integer (Primary Key)
	    - name: String
	    - category: String
	    - price: Decimal
	    - description: Text
	    - ranking: Integer (popularity ranking)
	    - created_at: DateTime
	    - updated_at: DateTime
	3. Outfit
	- Fields:
	    - id: Integer (Primary Key)
	    - name: String
	    - category: String (e.g., casual, formal)
	    - price: Decimal
	    - occasion: String (e.g., dinner, park, beach)
	    - weather: String (Auto-Fill: e.g., sunny, rainy)
	    - date_day: DateTime (Date of the planned event)
	    - description: Text
	    - created_at: DateTime
	    - updated_at: DateTime
	4. Gift Recommendation
	- Fields:
	    - id: Integer (Primary Key)
	    - user_id: Integer (Foreign Key to User)
	    - gift_id: Integer (Foreign Key to Gift)
	    - recipient: String
	    - recipient_age: Integer (fixed at 20)
	    - price_range: Decimal
	    - recommendation_date: DateTime
	5. Outfit Suggestion
	- Fields:
	    - id: Integer (Primary Key)
	    - user_id: Integer (Foreign Key to User)
	    - outfit_id: Integer (Foreign Key to Outfit)
	    - occasion: String
	    - place: String
	    - date_day: DateTime
	    - price_range: Decimal
	    - weather: String (Auto-Fill)
	    - suggestion_date: DateTime
	6. Date Spot Suggestion (Optional)
	- Fields:
	    - id: Integer (Primary Key)
	    - place: String
	    - description: Text
	    - category: String (e.g., restaurant, park, museum)
	    - location: String
	    - ranking: Integer
	    - created_at: DateTime
	    - updated_at: DateTime
 
	  entities = {
	  "User": ["id (PK)", "username", "email", "password", "signup_date", "is_active", "last_login"],
	  "Gift": ["id (PK)", "name", "category", "price", "description", "ranking", "created_at", "updated_at"],
	  "Outfit": ["id (PK)", "name", "category", "price", "occasion", "weather", "date_day", "description", "created_at", "updated_at"],
	  "Gift Recommendation": ["id (PK)", "user_id (FK)", "gift_id (FK)", "recipient", "recipient_age", "price_range", "recommendation_date"],
	  "Outfit Suggestion": ["id (PK)", "user_id (FK)", "outfit_id (FK)", "occasion", "place", "date_day", "price_range", "weather", "suggestion_date"],
	  "Date Spot Suggestion": ["id (PK)", "place", "description", "category", "location", "ranking", "created_at", "updated_at"]
	  }

## 7. API Endpoints
- [List main API endpoints if applicable]

## 8. User Interface Design
- [Describe the main screens and their purposes]

## 9. Algorithms
- [Outline the recommendation algorithms for gifts and outfits]

## 10. Privacy and Security Considerations
- [List important privacy and security measures]

## 11. Future Enhancements
- [Potential features for future versions]

## 12. Timeline and Milestones
- [Project timeline with key milestones]
