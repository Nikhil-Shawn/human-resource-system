package com.humanresourcemanagementsystem.Service.Impl;

import com.humanresourcemanagementsystem.Dto.EducationDTO;
import com.humanresourcemanagementsystem.Entity.*;
import com.humanresourcemanagementsystem.Repo.EducationRepository;
import com.humanresourcemanagementsystem.Repo.EmployeeRepository;
import com.humanresourcemanagementsystem.Repo.PersonRepository;
import com.humanresourcemanagementsystem.Service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EducationIMPL implements EducationService {

    //Provide data access operations for Education entity
    @Autowired
    private EducationRepository educationRepository;

    //Provide data access operations for Person entity
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    //Save single education
    public String addEducation(EducationDTO educationDTO) {

      // Checks if the associated person exists
       Person person = personRepository.findById(educationDTO.getPerson_id()).orElse(null);
       Employee employee = employeeRepository.findById(educationDTO.getEmployee_id()).orElse(null);

        Education education = new Education();

        // Fetch associated education information
        education.setDegree(educationDTO.getDegree());
        education.setInstitution(educationDTO.getInstitution());
        education.setMajor(educationDTO.getMajor());
        education.setGraduation_start_date(educationDTO.getGraduation_start_date());
        education.setGraduation_end_date(educationDTO.getGraduation_end_date());
        education.setCreated_at(educationDTO.getCreated_at());
        education.setUpdated_at(educationDTO.getUpdated_at());
        education.setPerson(person);
        education.setEmployee(employee);

        //Save education details
        educationRepository.save(education);
        return "Education added successfully";
    }

    @Override
    //Save multiple educations
    public String addMultipleEducations(List<EducationDTO> educationDTOs) {
        for (EducationDTO educationDTO : educationDTOs) {

            // Checks if the associated person exists
            Person person = personRepository.findById(educationDTO.getPerson_id()).orElse(null);
            if (person == null) {
                return "Person not found";
            }

            Education education = new Education();

            // Fetch associated education information
            education.setDegree(educationDTO.getDegree());
            education.setInstitution(educationDTO.getInstitution());
            education.setMajor(educationDTO.getMajor());
            education.setGraduation_start_date(educationDTO.getGraduation_start_date());
            education.setGraduation_end_date(educationDTO.getGraduation_end_date());
            education.setCreated_at(new Date());
            education.setUpdated_at(new Date());
            education.setPerson(person);

            //Save education details
            educationRepository.save(education);
        }
        return "Education records added successfully";
    }

    @Override
    //Display education by ID
    public EducationDTO getEducationById(int id) {
        Optional<Education> educationOpt = educationRepository.findById(id);
        if (educationOpt.isPresent()) {

            Education education = educationOpt.get();

            // Fetch associated education information
            EducationDTO educationDTO = new EducationDTO();
            educationDTO.setEducation_id(education.getEducation_id());
            educationDTO.setPerson_id(education.getPerson());
            educationDTO.setDegree(education.getDegree());
            educationDTO.setInstitution(education.getInstitution());
            educationDTO.setMajor(education.getMajor());
            educationDTO.setGraduation_start_date(education.getGraduation_start_date());
            educationDTO.setGraduation_end_date(education.getGraduation_end_date());
            educationDTO.setCreated_at(education.getCreated_at());
            educationDTO.setUpdated_at(education.getUpdated_at());

            return educationDTO;
        } else {
            throw new RuntimeException("Education not found with id: " + id);
        }
    }

    @Override
    //Display education by ID
    public EducationDTO getEducationByPersonId(int id) {
        Optional<Education> educationOpt = educationRepository.findById(id);
        if (educationOpt.isPresent()) {

            Education education = educationOpt.get();

            // Fetch associated education information
            EducationDTO educationDTO = new EducationDTO();
            educationDTO.setEducation_id(education.getEducation_id());
            educationDTO.setPerson_id(education.getPerson());
            educationDTO.setDegree(education.getDegree());
            educationDTO.setInstitution(education.getInstitution());
            educationDTO.setMajor(education.getMajor());
            educationDTO.setGraduation_start_date(education.getGraduation_start_date());
            educationDTO.setGraduation_end_date(education.getGraduation_end_date());
            educationDTO.setCreated_at(education.getCreated_at());
            educationDTO.setUpdated_at(education.getUpdated_at());

            return educationDTO;
        } else {
            throw new RuntimeException("Education not found with id: " + id);
        }
    }

    @Override
    //Display education by ID
    public EducationDTO getEducationByEmployeeId(int id) {
        Optional<Education> educationOpt = educationRepository.findById(id);
        if (educationOpt.isPresent()) {

            Education education = educationOpt.get();

            // Fetch associated education information
            EducationDTO educationDTO = new EducationDTO();
            educationDTO.setEducation_id(education.getEducation_id());
            educationDTO.setEmployee_id(education.getEducation_id());
            educationDTO.setDegree(education.getDegree());
            educationDTO.setInstitution(education.getInstitution());
            educationDTO.setMajor(education.getMajor());
            educationDTO.setGraduation_start_date(education.getGraduation_start_date());
            educationDTO.setGraduation_end_date(education.getGraduation_end_date());
            educationDTO.setCreated_at(education.getCreated_at());
            educationDTO.setUpdated_at(education.getUpdated_at());

            return educationDTO;
        } else {
            throw new RuntimeException("Education not found with id: " + id);
        }
    }

    @Override
    //Display all educations
    public List<EducationDTO> getAllEducation() {
        List<Education> educations = educationRepository.findAll();
        return educations.stream()
                .map(education -> {

                    // Fetch associated education information
                    EducationDTO educationDTO = new EducationDTO();
                    educationDTO.setEducation_id(education.getEducation_id());
                    educationDTO.setPerson_id(education.getPerson());
                    educationDTO.setDegree(education.getDegree());
                    educationDTO.setInstitution(education.getInstitution());
                    educationDTO.setMajor(education.getMajor());
                    educationDTO.setGraduation_start_date(education.getGraduation_start_date());
                    educationDTO.setGraduation_end_date(education.getGraduation_end_date());
                    educationDTO.setCreated_at(education.getCreated_at());
                    educationDTO.setUpdated_at(education.getUpdated_at());
                    return educationDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    //Updates benefit by ID
    public String updateEducationById(int id, EducationDTO educationDTO) {
        Optional<Education> educationOpt = educationRepository.findById((int) id);
        if (educationOpt.isPresent()) {
            Education education = educationOpt.get();

            // Fetch associated education information
            education.setDegree(educationDTO.getDegree());
            education.setInstitution(educationDTO.getInstitution());
            education.setMajor(educationDTO.getMajor());
            education.setGraduation_start_date(educationDTO.getGraduation_start_date());
            education.setGraduation_end_date(educationDTO.getGraduation_end_date());
            education.setUpdated_at(new Date());

            // Checks if the associated person exists
            Person person = personRepository.findById(educationDTO.getPerson_id()).orElse(null);
            if (person == null) {
                return "Person not found";
            }

            //Save education details
            educationRepository.save(education);
            return "Education updated successfully";

        } else {
            return "Education not found";
        }
    }

}
