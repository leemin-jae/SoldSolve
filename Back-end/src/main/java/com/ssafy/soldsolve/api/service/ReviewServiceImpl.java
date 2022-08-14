package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ReviewPostReq;
import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Review;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.ChatRepository;
import com.ssafy.soldsolve.db.repository.ReviewRepository;
import com.ssafy.soldsolve.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    ChatRepository chatRepository;

    @Override
    public boolean checkReview(User reviewer, User reviewee) {
        Review review = reviewRepository.findByReviewerAndReviewee(reviewer, reviewee);
        if (review!=null) return true;
        return false;
    }

    // 채팅 기록이 있는지 확인하기
    @Override
    public boolean checkChat(User reviewer, User reviewee) {
        Room r1 = roomRepository.findByBuyerAndSeller(reviewer, reviewee);
        Room r2 = roomRepository.findByBuyerAndSeller(reviewee, reviewer);
        // room이 있는지 먼저 확인한다. 둘 중 아무거나라도 상관 없음.
        if (r1 != null || r2 != null) {
            // user_pk를 기준으로 reviewer과 reviewee가 둘 다 채팅을 쳤는지 확인한다. 하나라도 null이면 안됨.
            Optional<List<Chat>> c1 = chatRepository.findAllByRoomAndWriteUser(r1, reviewer);
            Optional<List<Chat>> c2 = chatRepository.findAllByRoomAndWriteUser(r1, reviewee);
            Optional<List<Chat>> c3 = chatRepository.findAllByRoomAndWriteUser(r2, reviewer);
            Optional<List<Chat>> c4 = chatRepository.findAllByRoomAndWriteUser(r2, reviewee);
            if (c1 != null && c2 != null) {
                return true;
            } else if (c3 != null && c4 != null) {
                return true;
            }
            return false;
        }
        return false;
    }

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
