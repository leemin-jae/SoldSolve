package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.ProductImg;
import com.ssafy.soldsolve.db.repository.ProductImgRepository;
import com.ssafy.soldsolve.db.repository.ProductRepository;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class FileService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImgRepository productImgRepository;


    public String ImageDir(MultipartFile files, String special) throws IOException {
        String path = System.getProperty("user.dir");
        String sourceFileName = files.getOriginalFilename();
        String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();

        File destinationFile;
        String destinationFileName;
        String fileUrl = path + "/images/" + special +"/";

        do {
            destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + sourceFileNameExtension;
            destinationFile = new File(fileUrl + destinationFileName);

        } while (destinationFile.exists());

        //destinationFile.getParentFile().mkdirs();
        files.transferTo(destinationFile);

        return "/images/" + special +"/" + destinationFileName;
    }

    public void ListImageDir(List<MultipartFile> files,int number, String special) throws IOException {


        for(MultipartFile file : files) {

            String path = ImageDir(file, special);


            ProductImg pImg = new ProductImg();
            pImg.setNo(productRepository.findByNo(number));
            pImg.setPath(path);
            productImgRepository.save(pImg);

        }

        //return "/images/" + special +"/" + destinationFileName;
    }

}
