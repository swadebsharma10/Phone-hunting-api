
const loadPhones = async(searchPhone ='13' , isShowALL) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowALL);
    // console.log(phones)
   
}


const displayPhone = (phones , isShowALL)=>{
    
    const phonesContainer = document.getElementById('phone-container');
    // clear phones container cards before adding new card
    phonesContainer.textContent ='';

    // display show all button if there are more then 12 phone
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowALL){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    // console.log('isShowAll', isShowALL)

    // display only first 12 phones if not showAll
    if(!isShowALL){
        phones = phones.slice(0, 12);
    }
    else{

    }


    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList= 'card bg-gray-200 p-4 shadow-xl';
        phoneCard.innerHTML =`
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button onclick ="handleShowDetails('${phone.slug}');" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneCard)
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
} 

 // handleShow Details
 const handleShowDetails = async(id) =>{
    console.log('details btn is clicked', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data  = await res.json();
    const phone = data.data;
    
    // call this function
    showPhoneDetails(phone)
}

// handle showPhone Details
const  showPhoneDetails =(phone) =>{
    console.log(phone);

    // const phoneName = document.getElementById('phone-name');
    // phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <div class="card">
  <figure><img src="${phone.image}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title text-3xl font-medium">Name: ${phone.name}</h2>
    <h2 class="card-title text-xl font-medium">Storage: ${phone.mainFeatures?.storage}</h2>
    <h2 class="card-title text-xl font-medium">Brand: ${phone.brand}</h2>
  </div>
</div>
    
    `
        

    // show all modal
    show_detail_modal.showModal();
}


// handle search button
const handleSearch =(isShowALL) =>{
    // call here toggleLoadingSpinner at first
    toggleLoadingSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    console.log(searchText);
    // call the loadPhone Function
    loadPhones(searchText, isShowALL);
}

// loading spinner function
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
    
}

// handle show all

const handleShowAll =() =>{
    handleSearch(true);
}

loadPhones()