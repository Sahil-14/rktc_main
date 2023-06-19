const countIndentifier = document.getElementById('countIndentifier').innerHTML;
const hits = document.getElementById('hits');


if (countIndentifier == 1) {
    function updateVisitorsCount() {
        fetch('https://api.countapi.xyz/update/rktcind.in/ad5e6e7d-ef40-421e-9363-2bfe546f74c8/?amount=1')
            .then(res => res.json())
            .then(res => {
                hits.innerHTML = res.value;
                
            })
    }
    updateVisitorsCount()
}else{
    function updateVisitorsCount() {
        fetch('https://api.countapi.xyz/get/rktcind.in/ad5e6e7d-ef40-421e-9363-2bfe546f74c8')
            .then(res => res.json())
            .then(res => {
                hits.innerHTML = res.value;
                
            })
    }
    updateVisitorsCount()

}

