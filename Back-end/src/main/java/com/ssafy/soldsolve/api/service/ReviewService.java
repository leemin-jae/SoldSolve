package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ReviewPostReq;
import com.ssafy.soldsolve.db.entity.User;

public interface ReviewService {
    boolean checkReview(User reviewer, User reviewee);

    boolean checkChat(User reviewer, User reviewee);
    boolean createReview(User reviewer, User reviewee, ReviewPostReq Info);
//    void deleteReview(int reviewId);
}
