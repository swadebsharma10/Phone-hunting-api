
const loadPhones = async(searchPhone) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
    console.log(phones)
   
}


const displayPhone = phones =>{
    
    const phonesContainer = document.getElementById('phone-container');
    // clear phones container cards before adding new card
    phonesContainer.textContent ='';

    // display show all button if there are more then 12 phone
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    // display only first 12 phones
    phones = phones.slice(0, 12);


    phones.forEach(phone => {
        // console.log(phone)
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
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneCard)
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
} 


// handle search button
const handleSearch =() =>{
    // call here toggleLoadingSpinner at first
    toggleLoadingSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    console.log(searchText);
    // call the loadPhone Function
    loadPhones(searchText);
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

loadPhones()