const handleAllcategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const tabContainer = document.getElementById("tab-container")
    const allCategory = data.data;
  
    allCategory.forEach((category) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <a onclick="handleLoadVideos('${category.category_id}')" class="tab  border-2 mx-2  font-bold text-lg active:bg-red-500 active:text-white ">${category.category}</a> 
          ` ;
      tabContainer.appendChild(div)
    });
  
  
  }
  
  const handleLoadVideos = async (categoryId) => {
    console.log(categoryId)
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    console.log(data)
    // if data is available
    loadAllCard(data.data)
    
  
  }
  
 
  
  function loadAllCard(data){
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
  
    const noDataConatiner = document.getElementById("no-data-container");
    noDataConatiner.innerHTML = "";
  
    if (data.length > 0) {
  
      data?.forEach((videos) => {
  
        const div = document.createElement("div");
        div.innerHTML = `
           <div class="card  bg-base-100 shadow-xl  bg-pink-200 " >
          <div class="relative ">
              <figure><img src="${videos.thumbnail}" alt="Shoes"   class="w-full h-[250px] object-cover" />
              
              </figure>
              <p class="text-white bg-gray-900 p-2 absolute right-5 rounded-md bottom-5 ${videos.others?.posted_date? 'block' : 'hidden'}">${secondsToHoursMinutes(videos.others?.posted_date)}</p>
          </div>
          <div class="card-body">
           
            <div class="flex items-center justify-between gap-4  ">
            
            <div class="avatar">
            <div class="w-12 rounded-full">
            <img src="${videos.authors[0].profile_picture}" alt="">
            </div>
          </div>
              <p class="font-medium text-xl">${videos.title}</p>
  
            </div>
            <div class="flex gap-4 items-center">
              <h2  class="text-lg font-normal">${videos.authors[0].profile_name}</h2>
              <div class="${videos.authors[0]?.verified ? 'block' : 'hidden'}">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_13_960)">
                      <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                      <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92669C6.88909 8.52512 6.23752 8.52512 5.83596 8.92669C5.4344 9.32825 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                  </g>
                  <defs>
                      <clipPath id="clip0_13_960">
                      <rect width="20" height="20" fill="white"/>
                      </clipPath>
                  </defs>
                  </svg>
             
  
              </div>
              
            </div>
            <p class="font-normal text-base">${videos.others?.views} views</p>
          </div>
        </div> 
          ` ;
        cardContainer.appendChild(div);
      })
  
  
    } else {
      // if no data 
      const noDataConatiner = document.getElementById("no-data-container");
      cardContainer.innerHTML = "";
      const div = document.createElement("div");
      div.innerHTML = `
          <div class="">
          <img src="./images/nodata.jpg" alt="" class="inline">
          
          <p class="font-bold text-lg">Oops!! Sorry, There is no content here</p>
    
        </div>
          
          `
  
      noDataConatiner.appendChild(div);
  
    }
  
  
  }
  
  handleAllcategory();
  handleLoadVideos(1000)
  
  function secondsToHoursMinutes(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return (`${hours}hrs ${minutes} min ago`);
   
  }
  
  
  
  const soryByViews = async () => {
    const categoryId = 1000 ;
  
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const responseData = await response.json();
    console.log('data',responseData)
    
    console.log('categoryId',responseData.data[0].others)
  
    if(responseData){
      responseData.data.sort((a, b) => {
        const viewsA = parseFloat(a.others.views.replace('K', '')); 
        const viewsB = parseFloat(b.others.views.replace('K', '')); 
        return viewsB - viewsA; 
      });
    
      console.log('my sort data',responseData.data);
      loadSortedCard(responseData.data)
    }
    
   
  
  }
  
  
  function loadSortedCard(responseData){
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const noDataConatiner = document.getElementById("no-data-container");
    noDataConatiner.innerHTML = "";
  
   loadAllCard(responseData)
  
  }
  