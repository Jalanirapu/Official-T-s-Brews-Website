import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Star, CheckCircle, Trash, Check } from 'lucide-react';

const Reviews: React.FC = () => {
  const { reviews, addReview, user, approveReview, deleteReview } = useAppContext();
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  // If Admin, show ALL reviews. If User/Guest, show only APPROVED reviews.
  const isAdmin = user?.role === 'admin';
  const displayedReviews = isAdmin ? reviews : reviews.filter(r => r.approved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    addReview({ author, text, rating });
    setSubmitted(true);
    setAuthor('');
    setText('');
    setRating(5);
    
    // Reset submission message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6">
          {isAdmin ? 'Review Moderation' : 'Customer Reviews'}
        </h1>
        <p className="text-xl text-stone-600">
          {isAdmin ? 'Approve or delete customer reviews.' : 'See what others are sipping.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Review Form - Only show to non-admins */}
        {!isAdmin && (
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 sticky top-24">
              <h3 className="text-2xl font-bold text-stone-800 mb-4">Write a Review</h3>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Thank you! Your review has been submitted for moderation and will appear once approved by our team.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 focus:outline-none transition-colors ${
                            rating >= star ? 'text-amber-400' : 'text-stone-300'
                          }`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Review</label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Tell us what you liked..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-stone-900 text-white py-3 rounded-md font-bold hover:bg-stone-800 transition-colors"
                  >
                    Submit Review
                  </button>
                  <p className="text-xs text-stone-500 text-center mt-2">
                    Reviews are moderated before posting.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Review List - Admins see all, Users see approved */}
        <div className={`space-y-6 ${isAdmin ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          {displayedReviews.length === 0 ? (
            <div className="text-center py-12 bg-stone-100 rounded-lg">
              <p className="text-stone-500">No reviews yet.</p>
            </div>
          ) : (
            displayedReviews.map((review) => (
              <div 
                key={review.id} 
                className={`bg-white p-6 rounded-lg shadow-sm border ${
                  review.approved ? 'border-stone-100' : 'border-amber-200 bg-amber-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 font-bold">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-stone-900">{review.author}</h4>
                        {!review.approved && isAdmin && (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Pending</span>
                        )}
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-stone-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <span className="text-xs text-stone-400">{review.date}</span>
                     
                     {/* Admin Actions */}
                     {isAdmin && (
                        <div className="flex space-x-2">
                            {!review.approved && (
                                <button 
                                    onClick={() => approveReview(review.id)}
                                    className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                    title="Approve Review"
                                >
                                    <Check className="h-4 w-4" />
                                </button>
                            )}
                            <button 
                                onClick={() => deleteReview(review.id)}
                                className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                title="Delete Review"
                            >
                                <Trash className="h-4 w-4" />
                            </button>
                        </div>
                     )}
                  </div>
                </div>
                <p className="text-stone-700 leading-relaxed mt-3">"{review.text}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;