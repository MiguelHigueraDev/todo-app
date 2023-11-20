const mobileContainer = document.querySelector(".mobile-container");
const sidebar = document.querySelector(".sidebar");

const toggleMobileMenu = () => {
    if(sidebar.classList.contains("mobile-sidebar")) {
      mobileContainer.classList.remove("mobile-container-right");
      mobileContainer.classList.add("mobile-container-left");
      sidebar.classList.remove("mobile-sidebar");
    } else {
      sidebar.classList.add("mobile-sidebar");
      mobileContainer.classList.remove("mobile-container-left");
      mobileContainer.classList.add("mobile-container-right");
    }
}

const hideMobileMenu = () => {
    mobileContainer.classList.remove("mobile-container-right");
    mobileContainer.classList.add("mobile-container-left");
    sidebar.classList.remove("mobile-sidebar");
}

export { hideMobileMenu, toggleMobileMenu };