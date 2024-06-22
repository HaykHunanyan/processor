# track-api
<!-- <script>
    const interval = (numericValue) => {
      const intervalId = setInterval(function() {
        if (document.getElementById('yourIframeId')) {
          yourCustomFunction(numericValue);
          clearInterval(intervalId);
        };
      }, 1000);
    };
   
   const targetElement = document.getElementById('order_review');
   const observer = new MutationObserver(function(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.target === targetElement) {
          const updatedContent = targetElement.querySelectorAll('.woocommerce-Price-amount.amount')?.[3];
          const valueWithoutCurrency = updatedContent.textContent.replace("€", "");
          const numericValue = valueWithoutCurrency.replace(",", "");
          const paymentContent = document.getElementById('payment').style.display = "none";
          interval(numericValue);
        }
      }
    });
    observer.observe(targetElement, { childList: true, subtree: true });
    
    function yourCustomFunction(total) {
        const iframe = document.getElementById('yourIframeId');
        console.log(total,'total')
        const message = total;
        iframe?.contentWindow?.postMessage(message, 'https://commerce-app-944679868ee2.herokuapp.com');
    }
</script> -->