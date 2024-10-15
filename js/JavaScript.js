// Fetch and display all categories (pets)
const LoadAllCategory = async () => {
    try {
      const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
      const data = await response.json();
  
      if (data && data.pets) {
        DisplayAllCategory(data.pets);
      } else {
        console.error('Pets data not found in API response:', data);
        DisplayAllCategory([]); // Passing an empty array if pets data is not found
      }
    } catch (error) {
      console.error('Error fetching all categories:', error);
      DisplayAllCategory([]); // Passing an empty array on error
    }
  };
  
  // Fetch button categories
  const LoadCatagoriesBtn = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
      .then(res => res.json())
      .then(data => DisplayCatagoriesBtn(data.categories))
      .catch(err => console.error(err));
  };
  
  // Load categories by name
  const LoadCatagoriesName = async (category) => {
    // Show spinner before fetching data
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
  
    // Wait for 2 seconds before fetching data
    setTimeout(async () => {
      // Fetch pets based on category
      const pets = await fetchPetsByCategory(category);
  
      // Hide the spinner after data is fetched
      spinner.classList.add('hidden');
  
      // Display the pets
      DisplayAllCategory(pets);
    }, 2000); // 2000 milliseconds = 2 seconds
  };
  
  // Display buttons
  const DisplayCatagoriesBtn = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categoryContainer.innerHTML = ""; // Clear previous buttons
  
    categories.forEach(item => {
      const { category, category_icon } = item;
      const buttonContainer = document.createElement('div');
  
      buttonContainer.innerHTML = `
        <button class="btn px-10 text-lg" onclick="LoadCatagoriesName('${category}')">
            <img class="w-[30px] h-[30px] rounded-full object-cover" src=${category_icon} alt="Category Icon"> 
            ${category}
        </button>
      `;
  
      categoryContainer.append(buttonContainer);
    });
  };
  
  // Function to fetch pets from the API based on category
  async function fetchPetsByCategory(category) {
    try {
      const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Check if data structure is as expected
      if (data && data.pets) {
        // Filter pets based on the provided category
        const filteredPets = data.pets.filter(pet => pet.category.toLowerCase() === category.toLowerCase());
        console.log(filteredPets);
  
        const petList = document.getElementById('petList');
        petList.innerHTML = ''; // Clear previous list
    
        if (filteredPets.length === 0) {
        
  
          document.getElementById("customError").showModal();
  
  
        }
  
        return filteredPets.length > 0 ? filteredPets : [];
      } else {
        throw new Error('Unexpected data structure from the API');
      }
    } catch (error) {
      console.error('Error fetching pets:', error.message);
      return [];
    }
  }
  
  // Display details in the modal
  const DisplayDetails = (data) => {
    const modalContainer = document.getElementById("modalContent");
    const { pet_name, breed, date_of_birth, price, image, gender, pet_details, vaccinated_status } = data;
  
    modalContainer.innerHTML = `
      <div>
  
        <img class="w-full rounded-md object-cover" src="${image}" alt="Pet Image">
        <div class="p-4 text-start">
          <h2 class="text-2xl font-bold text-gray-800">${pet_name}</h2>
          <div class="grid grid-cols-2 gap-4 mt-3 text-gray-700">
            <div class="flex items-center">
              <i class="fa-solid fa-paw mr-2"></i> Breed: ${breed}
            </div>
            <div class="flex items-center">
              <i class="fa-regular fa-calendar-days mr-2"></i> Birth: ${date_of_birth}
            </div>
            <div class="flex items-center">
              <i class="fa-solid fa-venus mr-2"></i> Gender: ${gender}
            </div>
            <div class="flex items-center">
              <i class="fa-solid fa-dollar-sign mr-2"></i> Price: ${price}$
            </div>
            <div class="flex items-center col-span-2">
              <i class="fa-solid fa-syringe mr-2"></i> Vaccinated status: ${vaccinated_status}
            </div>
          </div>
          <div class="divider"></div>
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-800">Details Information</h3>
            <p class="mt-2 text-sm text-gray-600">${pet_details}</p>
          </div>
        </div>
      </div>
    `;
    document.getElementById("custom").showModal();
  };
  
  // Display all categories (pets) data
  const DisplayAllCategory = async (datas) => {
    const displayCard = document.getElementById('displayCard');
    displayCard.innerHTML = ""; // Clear previous content
  
    if (!datas || !Array.isArray(datas)) {
      console.error('Data is undefined or not an array:', datas);
      displayCard.innerHTML = `<p>No data available to display.</p>`;
      return;
    }
  
    datas.forEach(data => {
      const card = document.createElement('div');
      const { pet_name, breed, date_of_birth, price, image, gender, petId } = data;
      card.innerHTML = `
        <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-3 overflow-hidden">
          <img class="w-full h-48 object-cover rounded-md" src=${image} alt="Pet Image">
          <div class="p-2">
            <h2 class="text-lg text-start font-semibold text-gray-800">${pet_name}</h2>
            <div class="text-sm text-gray-600 mt-2 space-y-2">
              <p class="flex items-center">${breed}</p>
              <p class="flex items-center">${date_of_birth}</p>
              <p class="flex items-center">${gender}</p>
              <p class="flex items-center">${price}$</p>
            </div>
            <div class="mt-4 flex justify-between items-center w-full gap-3">
              <button id="showImageBtn" onclick="ShowImage(${petId})" class="px-5 py-1 bg-white text-[#0E7A81] border shadow-md rounded-lg hover:bg-[#267277] hover:text-white focus:outline-none"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick="AdoptBtn()" class="px-2 py-1 bg-white text-[#0E7A81] border shadow-md rounded-lg hover:bg-[#267277] hover:text-white focus:outline-none">Adopt</button>
              <button onclick="LoadDetails(${petId})" class="px-2 py-1 bg-white text-[#0E7A81] border shadow-md rounded-lg hover:bg-[#267277] hover:text-white focus:outline-none">Details</button>
            </div>
          </div>
        </div>
      `;
      displayCard.appendChild(card);
    });
  };
  
  // Load details
  const LoadDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
      .then(res => res.json())
      .then(data => DisplayDetails(data.petData))
      .catch(err => console.error(err));
  };
  
  // Show image function
  const ShowImage = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
      .then(res => res.json())
      .then(data => showImageDisplay(data.petData))
      .catch(err => console.error(err));
  };
  
  // Show image and handle like action
  const showImageDisplay = (data) => {
    const showImage = document.getElementById("show_img");
    const { pet_name, image } = data;
  
    const newImageDiv = document.createElement('div');
    newImageDiv.innerHTML = `
      <div class="p-2">
        <img src="${image}" alt="${pet_name}" class="rounded-md object-cover"/>
      </div>
    `;
    showImage.appendChild(newImageDiv);
  };
  
  // Sort by price function
  const SortByPrice = () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
      .then(response => response.json())
      .then(data => {
        // Sort the array of pets by price
        data.pets.sort((a, b) => b.price - a.price); // Sort in ascending order
        DisplayAllCategory(data.pets); // Display the sorted pets
      })
      .catch(err => console.error(err));
  
    console.log("SortByPrice");
  };
  
  
  
  // Adopt button function
  const AdoptBtn = () => {
    const modal_btn = document.getElementById("modal_btn");
    const adopt_modal = document.getElementById("custom_modal"); 
    const countdownDisplay = document.getElementById("countdown_display"); 
  
    let countdownValue = 3;
  
    // Disable the button after it's clicked
    modal_btn.disabled = true;
  
    // Show the modal
    adopt_modal.showModal();
    countdownDisplay.textContent = countdownValue; 
  
    const countdownTimer = setInterval(() => {
      countdownValue--;
      countdownDisplay.textContent = countdownValue; 
  
      if (countdownValue < 0) {
        clearInterval(countdownTimer);
        countdownDisplay.textContent = "Adoption Process Completed"; 
        adopt_modal.close();
      }
    }, 1000);
  };
  
  
  
  
  
  
  
  // Initialize loading all categories and buttons
  LoadAllCategory();
  LoadCatagoriesBtn();
  