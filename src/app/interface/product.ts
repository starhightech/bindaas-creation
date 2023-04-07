export interface Products {
  id: number,
  type: String,
  city: String,
  user_id: String,
  media_id: String,
  business_id: String,
  headcat: String,
  category_id: String,
  title: String,
  slug: String,
  brand: String,
  price: String,
  has_discount: String,
  discount: String,
  condition: String,
  location: String,
  latitude: String,
  longitude: String,
  content: String,
  options: String,
  is_verified: String,
  is_featured: String,
  is_deleted: String,
  hits: String,
  rating: String,
  review_count: String,
  status: String,
  created_at: String,
  updated_at: String,
  image: String,
  url: String,
  category: category
}

export interface category{
  name: String
}
