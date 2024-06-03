package com.humanresourcemanagementsystem.Mapper;

import com.humanresourcemanagementsystem.Dto.EmployeePersonDTO;
import com.humanresourcemanagementsystem.Entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    @Mapping(source = "person.personID", target = "personID")
    @Mapping(source = "person.firstName", target = "firstName")
    @Mapping(source = "person.lastName", target = "lastName")
    @Mapping(source = "person.address", target = "address")
    @Mapping(source = "person.email", target = "email")
    @Mapping(source = "person.phone", target = "phone")
    @Mapping(source = "person.dateOfBirth", target = "dateOfBirth")
    @Mapping(source = "person.gender", target = "gender")
    @Mapping(source = "person.nationality", target = "nationality")
    @Mapping(source = "person.maritalStatus", target = "maritalStatus")
    @Mapping(source = "person.personType", target = "personType")
    @Mapping(source = "person.createdAt", target = "createdAt")
    @Mapping(source = "person.updatedAt", target = "updatedAt")
    EmployeePersonDTO toDTO(Employee employee);
}
