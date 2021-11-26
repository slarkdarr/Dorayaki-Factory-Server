# Dorayaki-Factory-Server
Adalah web service yang dibangun menggunakan arsitektur REST menggunakan untuk menyediakan data dorayaki pabrik

## Instalation
- Create .env based on .env.example, fill it accordingly
- npm install
- Make sure mysql running
- npm start

## Table
### Users
id, username, name, email, password, createdAt, updatedAt

### ingredients
id, name, stock, createdAt, updatedAt

### recipes
id, name, description, createdAt, updatedAt

### recipeingredients
id, RecipeId, IngredientId, quantity, createdAt, updatedAt

### requests
id, email, recipe_name, quantity, status, createdAt, updatedAt

### logrequests
id, ip, endpoint, createdAt
## API DOCS
### User
- [GET] `{{ route }}/api/users`
- [GET] `{{ route }}/api/users/:username`
- [POST] `{{ route }}/api/users/login`
- [POST] `{{ route }}/api/users`

### Recipes
- [GET] `{{ route }}/api/recipes`
- [GET] `{{ route }}/api/recipes/:id`
- [POST] `{{ route }}/api/recipes` Need auth JWT

### Ingredients
- Need auth JWT
- [GET] `{{ route }}/api/ingredients`
- [GET] `{{ route }}/api/ingredients/:id`
- [POST] `{{ route }}/api/ingredients` Need auth JWT
- [PUT] `{{ route }}/api/ingredients/:id`

### Requests
- Need auth JWT
- [GET] `{{ route }}/api/requests?limit=[true,false]` optional true if limit to last 5 minutes
- [GET] `{{ route }}/api/requests/:id`
- [POST] `{{ route }}/api/requests`
- [PUT] `{{ route }}/api/requests/:id`


## Pembagian tugas
