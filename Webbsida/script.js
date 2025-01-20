const jasonCheckbox = document.getElementById('jason-checkbox');
const predatorCheckbox = document.getElementById('predator-checkbox');
const gretaCheckbox = document.getElementById('greta-checkbox');
const ghostfaceCheckbox = document.getElementById('ghostface-checkbox');
const mikeCheckbox = document.getElementById('mike-checkbox');

const targetFirstName = document.getElementById('target-first-name');
const targetLastName = document.getElementById('target-last-name');
const targetAdress = document.getElementById('target-adress');
const targetZipCode = document.getElementById('target-zip-code');
const targetCity = document.getElementById('target-city');
const totalPrice = document.getElementById('total-price');

const clientFirstName = document.getElementById('client-first-name');
const clientLastName = document.getElementById('client-last-name');
const clientPhoneNumber = document.getElementById('client-phone-number');
const clientEmail = document.getElementById('client-email');

let orderArray = [];
let orderPrice = 0;
let orderClient = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
}
updatePrice();

const cart = document.getElementById('cart');

const addToCart = document.getElementById('add-to-cart');
const checkoutCart = document.getElementById('checkout-cart');

addToCart.addEventListener('click', () => {
    let hitmen = [];
    if (jasonCheckbox.checked) {
        hitmen.push('Jason Vorhees');
    }
    if (predatorCheckbox.checked) {
        hitmen.push('The Predator');
    }
    if (gretaCheckbox.checked) {
        hitmen.push('Greta Thunberg');
    }
    if (ghostfaceCheckbox.checked) {
        hitmen.push('Ghostface');
    }
    if (mikeCheckbox.checked) {
        hitmen.push('Micheal Myers');
    }
    if (!hitmen.length) {
        Swal.fire({
            title: 'Input Error',
            text: 'Please select one or more of our associates to order a hit.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }
    else {
        let selectedHitmen = "";
        if (hitmen.length = 1) {
            selectedHitmen = hitmen[0];
        }
        else {
            for(h of hitmen){
                selectedHitmen += h + ", "
            }
            selectedHitmen = selectedHitmen.slice(0, -2);
        }
        let target = {
            firstName: "",
            lastName: "",
            adress: "",
            zipCode: "",
            city: "",
        }
        if (isOnlyLetters(targetFirstName.value.trim())){
            target.firstName = targetFirstName.value;

            if (isOnlyLetters(targetLastName.value.trim())) {
                target.lastName = targetLastName.value;

                if (isValidAddress(targetAdress.value)) {
                    target.adress = targetAdress.value;

                    if (isOnlyNumbers(targetZipCode.value)) {
                        target.zipCode = targetZipCode.value;

                        if (isOnlyLetters(targetCity.value.trim())) {
                            target.city = targetCity.value;

                            let hitOrder = {
                                orderTarget: target,
                                orderHitmen: hitmen
                            }

                            orderArray.push(hitOrder);
                            const hit = document.createElement('li');

                            hit.innerHTML = " 1 x <br>Associate hitman: " + selectedHitmen +
                                "<br>Target profile:<br>Name: " + target.firstName + " " + target.lastName +
                                "<br>Adress: " + target.adress + " " + target.zipCode + " " + target.city +
                                "<br>Price: 0.048₿";
                            
                            const removeBtn = document.createElement('button');
                            removeBtn.textContent = "Remove from cart";
                            removeBtn.style.marginLeft = '10px';
                            console.log(orderArray)

                            removeBtn.addEventListener('click', () => {
                                hit.remove();
                                let index = orderArray.indexOf(hitOrder);
                                if (index !== -1) {
                                    orderArray.splice(index, 1);
                                }
                                updatePrice();
                                console.log(orderArray);
                            })

                            hit.appendChild(removeBtn);
                            cart.appendChild(hit);
                            updatePrice();
                            clearOrder();
                            Swal.fire({
                                title: 'Hit specifications saved!',
                                text: 'This hit has been added to your cart below.',
                                icon: 'success',
                                confirmButtonText: 'Yay!'
                            });
                        }
                        else {
                            Swal.fire({
                                title: 'Input Error',
                                text: 'Please type in the targets home city using only letters.',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            });
                            return;
                        }
                    }
                    else {
                        Swal.fire({
                            title: 'Input Error',
                            text: 'Please type in the targets zip code using only numbers.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                        return;
                    }
                }
                else {
                    Swal.fire({
                        title: 'Input Error',
                        text: 'Please type in the targets home adress using the following format: "Adress 123".',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    return;
                }
            }
            else {
                Swal.fire({
                    title: 'Input Error',
                    text: 'Please type in the targets last name using only letters.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
        }
        else {
            Swal.fire({
                title: 'Input Error',
                text: 'Please type in the targets first name using only letters.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
    }


});

checkoutCart.addEventListener('click', () => {
    if (!orderArray.length) {
        Swal.fire({
            title: 'Empty cart',
            text: 'Please add one or more hits to the cart before checking out.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }
    else {
        if (isOnlyLetters(clientFirstName.value.trim())) {
            orderClient.firstName = clientFirstName.value;

            if (isOnlyLetters(clientLastName.value.trim())) {
                orderClient.lastName = clientLastName.value;

                if (isOnlyNumbers(clientPhoneNumber.value)) {
                    orderClient.phoneNumber = clientPhoneNumber.value;

                    if (isValidEmail(clientEmail.value)) {
                        orderClient.email = clientEmail.value;

                        const cartHits = cart.querySelectorAll('li');
                        for (hit of cartHits) {
                            if (hit.style.display !== 'none') {
                                hit.remove();
                            }
                        }  
                        clearCheckout();
                        updatePrice();
                        
                        Swal.fire({
                            title: 'Congratulations!',
                            text: 'You just completed your order, an associate will contact you within a few days to make sure we carry out every hit to your satisfaction!',
                            icon: 'success',
                            confirmButtonText: 'Yay!'
                        });
                    }
                    else {
                        Swal.fire({
                            title: 'Input Error',
                            text: 'Please type in your email in the following format: "example@domain.com".',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                        return;
                    }
                }
                else {
                    Swal.fire({
                        title: 'Input Error',
                        text: 'Please type in your phone number using only numbers.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    return;
                }
            }
            else {
                Swal.fire({
                    title: 'Input Error',
                    text: 'Please type in your last name using only letters.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
        }
        else {
            Swal.fire({
                title: 'Input Error',
                text: 'Please type in your first name using only letters.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
    }
});

function isOnlyLetters(input) {
    const regex = /^[a-zA-ZåäöÅÄÖ\s\u00C0-\u017F']+$/; 
    return regex.test(input); 
}

function isValidAddress(input) {
    const regex = /^[a-zA-ZåäöÅÄÖ\s]+ \d+$/; 
    return regex.test(input);
}

function isOnlyNumbers(input) {
    const regex = /^[\d\s]+$/;
    return regex.test(input);
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function clearOrder() {
    jasonCheckbox.checked = false;
    predatorCheckbox.checked = false;
    gretaCheckbox.checked = false;
    ghostfaceCheckbox.checked = false;
    mikeCheckbox.checked = false;

    targetFirstName.value = "";
    targetLastName.value = "";
    targetAdress.value = "";
    targetZipCode.value = "";
    targetCity.value = "";
}

function clearCheckout() {
    for (let key in orderClient) {
        if (orderClient.hasOwnProperty(key)) {
            orderClient[key] = "";
        }
    }
    orderArray = [];
    clientFirstName.value = "";
    clientLastName.value = "";
    clientPhoneNumber.value = "";
    clientEmail.value = "";
}

function updatePrice() {
    orderPrice = 0.048 * orderArray.length;
    totalPrice.textContent = orderPrice + " ₿";
}

