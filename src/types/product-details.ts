export interface ProductDetails {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  feedback: Feedback;
}

export interface Feedback {
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: number;
  review: string;
}
