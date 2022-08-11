package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ReviewPostReq;
import com.ssafy.soldsolve.db.entity.Review;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public boolean checkReview(User reviewer, User reviewee) {
        Review review = reviewRepository.findByReviewerAndReviewee(reviewer, reviewee);
        if (review!=null) return true;
        return false;
    }

//    public boolean findReview(User reviewer, int reviewId) {
//        Review review = reviewRepository.findByReviewerAndReviewid(reviewer, reviewId);
//        if (review!=null) {
//            return true;
//        }
//        return false;
//    }

    @Override
    public boolean createReview(User reviewer, User reviewee, ReviewPostReq Info) {
        Review review = new Review();
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setScore(Info.getScore());
        review.setContent(Info.getContent());
        reviewRepository.save(review);
        return true;
    }

//    @Override
//    public void deleteReview(int reviewId) {
//        reviewRepository.delete(reviewRepository.getOne(reviewId));
//    }
}
