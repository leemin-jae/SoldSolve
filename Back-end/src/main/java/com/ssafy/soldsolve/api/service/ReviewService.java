package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ReviewPostReq;
import com.ssafy.soldsolve.db.entity.Review;
import com.ssafy.soldsolve.db.entity.User;

public interface ReviewService {
    boolean checkReview(User reviewer, User reviewee);
    boolean checkChat(User reviewer, User reviewee);
    boolean createReview(User reviewer, User reviewee, ReviewPostReq Info);
    Review getReview(User reviewer, User reviewee);
    void updateReview(ReviewPostReq Info, Review review, User reviewee);
    void deleteReview(int reviewId);
}
