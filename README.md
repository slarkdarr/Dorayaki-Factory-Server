# Dorayaki-Factory-Server

## Instalation
- Create .env based on .env.example, fill it accordingly
- npm install
- Make sure mysql running
- npm start


## Table
### Users
id, username, name, email, password, createdAt, updatedAt

### Ingredients
id, name, stock, createdAt, updatedAt

### Recipes
id, name, description, createdAt, updatedAt

### RecipeIngredients
id, RecipeId, IngredientId, quantity, createdAt, updatedAt

### Requests
id, email, recipe_name, quantity, status, createdAt, updatedAt

## API DOCS
### User
- [GET] `{{ route }}/api/users`
- [GET] `{{ route }}/api/users/:username`
- [POST] `{{ route }}/api/users/login`
- [POST] `{{ route }}/api/users`

### Recipes
- Need auth JWT
- [GET] `{{ route }}/api/recipes`
- [GET] `{{ route }}/api/recipes/:id`
- [POST] `{{ route }}/api/recipes`

### Ingredients
- Need auth JWT
- [GET] `{{ route }}/api/ingredients`
- [GET] `{{ route }}/api/ingredients/:id`
- [POST] `{{ route }}/api/ingredients`
- [PUT] `{{ route }}/api/ingredients/:id`

### Requests
- Need auth JWT
- [GET] `{{ route }}/api/requests?limit=[true,false]` true if limit to last 5 minutes
- [GET] `{{ route }}/api/requests/:id`
- [POST] `{{ route }}/api/requests`
- [PUT] `{{ route }}/api/requests/:id`


## Todo
- Validation dan logic accepted request (update stock di bahan apakah memenuhi)
- Send email to admin
- Send response soap
- Receive response soap ?