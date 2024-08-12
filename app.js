document.addEventListener('DOMContentLoaded',(event) =>{

  function updateButtonVisibility(wrapper, leftButton, rightButton, itemWidth) {
    const totalWidth = Array.from(wrapper.children).reduce((width, videoItem) =>{
      return width + videoItem.offsetWidth;
    }, 0);
    
    if (totalWidth <= wrapper.offsetWidth){
      rightButton.style.display ='none';
    } else {
      rightButton.style.display ='block';
    }

    if (wrapper.scrollLeft > 0) {
      leftButton.style.display = 'block';
    } else {
      leftButton.style.display = 'none';
    }

    if (wrapper.scrollLeft + wrapper.offsetWidth >= totalWidth) {
      rightButton.style.display = 'none';
    } else {
      rightButton.style.display = 'block';
    }

  }

  const carousel =[
    {
      wrapper: document.querySelector('#button-left').closest('.carousel-container').querySelector('.videos'),
      leftButton: document.getElementById('button-left'),
      rightButton: document.getElementById('button-right'),
    },

    {
      wrapper: document.querySelector('#button-left1').closest('.carousel-container').querySelector('.videos'),
      leftButton: document.getElementById('button-left1'),
      rightButton: document.getElementById('button-right1'),
    }
  ];

  carousel.forEach((carousel,index) => {
    const videoItens = carousel.wrapper.querySelectorAll('#video-itens');

    if (videoItens.length > 0){
      const itemWidth = videoItens[0].offsetWidth + parseInt(window.getComputedStyle(videoItens[0]).marginRight);
      
      
      carousel.leftButton.addEventListener('click',function(){
        console.log(`carrosel ${index + 1} scroll left foi clicado`)
        carousel.wrapper.scrollBy({
          left: -itemWidth * 4,
          behavior: 'smooth'
        });
        setTimeout(() => updateButtonVisibility(carousel.wrapper, carousel.leftButton, carousel.rightButton, itemWidth),400);
      });

      carousel.rightButton.addEventListener('click',function(){
        console.log('Current scrollLeft:', carousel.wrapper.scrollLeft);
        console.log(`carrosel ${index + 1} scroll right foi clicado`)
        carousel.wrapper.scrollBy({
          left: itemWidth * 4,
          behavior: 'smooth'
        });
        setTimeout(() => updateButtonVisibility(carousel.wrapper, carousel.leftButton, carousel.rightButton, itemWidth),400);
      });

      setTimeout(() => updateButtonVisibility(carousel.wrapper, carousel.leftButton, carousel.rightButton, itemWidth),400);

    } else{
      console.error(`nenhum video encontrado no carrosel ${index + 1}.`);
    }
  });
  function addTargetBlank(containerId){
    const container = document.getElementById(containerId);
    const links = container.getElementsByTagName('a');

    Array.from(links).forEach(link => {
      link.target = '_blank';
    })

  }

  addTargetBlank('videos-container');
  addTargetBlank('videos-container1');
});

