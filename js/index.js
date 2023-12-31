const sortBtn = document.getElementById('btn-sortby') 

let allData = [];

const fetchTools =async () => {
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const res =  await fetch(url);
    const data = await res.json()
    allData = data.data.tools;
    displayTools(data.data.tools.slice(0,6));
  sortBtn.addEventListener('click',() => {
    const sortedTools = data.data.tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    displayTools(sortedTools.slice(0,6));
  })

}

const displayTools = tools =>{
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.textContent = '';
  

    tools.forEach(tools => {
      const{ id,image,features,name, published_in } =tools;
        const toolDiv = document.createElement('div')
        toolDiv.classList.add('col')
        toolDiv.innerHTML = `
        <div class="card">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>

          <p class="card-text">1.${features[0]}</p>
          <p class="card-text">2.${features[1]}</p>
          <p class="card-text">3.${features[2]}</p>
        </div>
        <hr>
        <h5 class="card-title">${name}</h5>
        <div>
        <div class="d-flex justify-content-between px-2 pb-2">
        <i class="fa-regular fa-calendar"></i>
        <small class="text-muted">${published_in}</small>
        <div class="rounded-circle bg-danger-subtle px-2 py-1">
        <i class="fa-solid fa-arrow-right text-danger" onclick="loadToolDetails('${id}')" data-bs-toggle="modal"
        data-bs-target="#exampleModal"> 
        </i>
        </div>
        
        </div>
       
        </div>
      
        
        
    </div>


        `,

        toolsContainer.appendChild(toolDiv)
    });
    // console.log(tools);
    // toggleSpinner(false);



  
}

// document.getElementById('btn-sortby').addEventListener('click',function(){
//     // console.log('dfd');
// })

        // spinner added--------------------------------------------------------
        const processShow =(dataLimit) =>{
          toggleSpinner(true)
          const seeMore = document.getElementById('btn-see-more');
          const seeMoreAll = seeMore.innerText;
          fetchTools(seeMoreAll ,dataLimit);

      
      }

  document.getElementById('btn-see-more').addEventListener('click',function(){

    toggleSpinner(true);

    displayTools(allData);
    // const showAll = data.data.tools
    // processShow(10)
    document.getElementById('btn-see-more').style.display = 'none';
    toggleSpinner(false)
  })


const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }

}


const loadToolDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  displayToolDetails(data.data)
}

const displayToolDetails = tools =>{
  console.log(tools)
  const modalDescription = document.getElementById('modal-description')
  modalDescription.innerText =tools.description;
  const modalPricing = document.getElementById('modal-pricing')
  modalPricing.innerText = tools.pricing[0].price == "No cost" ? "Price not available": tools.pricing[0].price
  const modalPricing1 = document.getElementById('modal-pricing1')
  modalPricing1.innerText = tools.pricing[1].price
  const modalPricing2 = document.getElementById('modal-pricing2')
  modalPricing2.innerText = tools.pricing[2].price
  // const featureHeader = document.getElementById('Feature-header')
  // featureHeader=tools.feature
  const modalFeature = document.getElementById('modal-features')
  modalFeature.innerText =tools.features[1].feature_name
  const modalFeature1 = document.getElementById('modal-feature1')
  modalFeature1.innerText =tools.features[2].feature_name
  const modalFeature2 = document.getElementById('modal-feature2')
  modalFeature2.innerText =tools.features[3].feature_name

  const modalintegrations = document.getElementById('modal-integrations')
  modalintegrations.innerText =tools.integrations[0]
  const modalintegration1 =document.getElementById('modal-integration1')
  modalintegration1.innerText = tools.integrations[1]
  const modalintegration2 = document.getElementById('modal-integration2')
  modalintegration2.innerText = tools.integrations[2]






  const modalImage =document.getElementById('modal-image')
        modalImage.innerHTML = `
        <img src="${tools.image_link[0]}" class="card-img-top" alt="...">
          <p>${tools.input_output_examples[0].input
          }</p>
          <p>${tools.input_output_examples[0].output
          }</p>
        
        
        `;
    // modalImage.appendChild(modalContainer)

}



fetchTools()





















