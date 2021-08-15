const form = document.querySelector('.form');
form.addEventListener('submit',(e)=>{
    // e.preventDefault();
})


//-------add founder list-----------------------
const founderList = document.querySelector('.founder-list');
const addFounderBtn = document.querySelector('.add-founder-btn');
const founderInput = document.querySelector('.founder-input');

addFounderBtn.addEventListener('click',()=>{
    if(founderInput.value===''){
        return
    }
    const founderItem = document.createElement('li');
    founderItem.innerHTML = `${founderInput.value}<input value=${founderInput.value} type='hidden' name='founders[]' />`;
    founderList.appendChild(founderItem);
    founderInput.value='';
});

//-----------------add employee list----------------------------------------------
const employeeList = document.querySelector('.employee-list');
const addEmployeeBtn = document.querySelector('.add-employee-btn');
const employeeInput = document.querySelector('.employee-input');
addEmployeeBtn.addEventListener('click',()=>{
    if(employeeInput.value===''){
        return
    }
    const employeeItem = document.createElement('li');
    employeeItem.innerHTML = `${employeeInput.value}<input value=${employeeInput.value} type='hidden' name='employees[]' />`;
    employeeList.appendChild(employeeItem);
    employeeInput.value='';
});

const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click',()=>{
    form.submit();
});

