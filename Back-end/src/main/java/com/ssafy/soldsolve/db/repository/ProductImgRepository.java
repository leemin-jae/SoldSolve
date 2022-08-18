package com.ssafy.soldsolve.db.repository;


import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.ProductImg;
import com.ssafy.soldsolve.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductImgRepository extends JpaRepository<ProductImg, Integer> {

    List<ProductImg> findByNo(Product no);


}
