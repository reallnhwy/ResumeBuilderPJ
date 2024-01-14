const strRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
}

let firstnameElem = mainForm.firstname,
    middlenameElem = mainForm.middlename,
    lastnameElem = mainForm.lastname,
    imageElem = mainForm.image,
    designationElem = mainForm.designation,
    addressElem = mainForm.address,
    emailElem = mainForm.email,
    phonenoElem = mainForm.phoneno,
    summaryElem = mainForm.summary

// Display elements
let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'), 
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');

    // console.log(nameDsp, imageDsp, phonenoDsp, emailDsp, addressDsp, designationDsp, summaryDsp, projectsDsp, achievementsDsp, skillsDsp, educationsDsp, experiencesDsp)


// First value is for the attributes and second one passes the nodeLists
const fetchValues = (attrs, ...nodeLists) => {

    // Count how many attributes are there e.g. Title and Description => 2
    let elemAttrsCount = nodeLists.length; 
    
    // Count how many data are there in each Attributes
    // This will depends on how many repeaters value (e.g. Achievements)  user put in 
    let elemDataCount = nodeLists[0].length;

    // Empty array to store data
    let tempDataArr = [];

    // i loop is for the number of repeaters value 
    for(let i = 0; i < elemDataCount; i++){
        let dataObj = {}; // Creating an empty object to fill the data 
        // j loop is for fetching data for each attributes 
        for(let j = 0; j < elemAttrsCount; j++){
            // Setting the key name for the object and fill it with data (e.g. title[0] then outer loop create a another data obj to fill in data for 2nd attributes e.g. description[0])
            // j for attributes 
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
}

const getUserInputs = () => {

    // Achivements
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // Experiences 
    let expTitleEle = document.querySelectorAll('.exp_title'),
    expOrganizationEle = document.querySelectorAll('.exp_organization'), 
    expEndDateEle = document.querySelectorAll('.exp_end_date'), 
    expStartDateEle = document.querySelectorAll('.exp_start_date'),
    expDescriptionEle = document.querySelectorAll('.exp_description'),
    expLocationEle = document.querySelectorAll('.exp_location')

    // Educations
    let eduSchoolEle = document.querySelectorAll('.edu_school'),
    eduDegreeEle = document.querySelectorAll('.edu_degree'),
    eduCityEle = document.querySelectorAll('.edu_city'),
    eduStartDateEle = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateEle = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionEle = document.querySelectorAll('.edu_description')

    // Projects
    let pjTitleEle = document.querySelectorAll('.proj_title'),
    pjLinkEle = document.querySelectorAll('.proj_link'),
    pjDescriptionEle = document.querySelectorAll('.proj_description')

    // Skills 
    let skillEle = document.querySelectorAll('.skill')

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateEle.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expEndDateEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateEle.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateEle.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    pjTitleEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    pjLinkEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    pjDescriptionEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillEle.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

  
    return {
        firstname : firstnameElem.value,
        lastname : lastnameElem.value,
        middlename : middlenameElem.value,
        image : imageElem.value,
        designation : designationElem.value,
        address : addressElem.value,
        email : emailElem.value,
        phoneno : phonenoElem.value,
        summary : summaryElem.value,
        //maybe change designation to links
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title','exp_organization','exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleEle, expOrganizationEle,expLocationEle, expStartDateEle, expEndDateEle, expDescriptionEle),
        educations: fetchValues(['edu_school','edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolEle, eduDegreeEle, eduCityEle, eduStartDateEle, eduGraduationDateEle, eduDescriptionEle),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], pjTitleEle, pjLinkEle, pjDescriptionEle),
        skills: fetchValues(['skill'], skillEle)
    }
}

function validateFormData(elem, elemType, elemName){

    // Checking for text and empty
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem); 
    }

    // Checking for text 
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName); else removeErrMsg(elem);
    }

    // Checking for email
    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // Checking for phone number
    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // Checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');

        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem)
    })
}

const displayCV = (userData) => {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}

const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData)
    console.log(userData)
}

function previewImage(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function(ofEvent) {
        imageDsp.src = ofEvent.target.result;
    }
}

function printCV() {
    window.print;
}


