let Swal = null;
try {

    const _swal = require('sweetalert2');
    Swal = _swal && _swal.default ? _swal.default : _swal;
} catch (e) {

    console.warn('SweetAlert2 could not be required:', e);
}


try {
    require('sweetalert2/dist/sweetalert2.min.css');
} catch (e) {

}


let $ = null;
try {
    $ = require('jquery');
} catch (e) {

    if (typeof window !== 'undefined' && window.jQuery) $ = window.jQuery;
}

$(document).ready(function () {


    function displaySweetAlert(message, icon = 'error') {
        if (!Swal) {

            console.warn('Swal is not available, falling back to window.alert. Message:', message, 'icon:', icon);
            window.alert(message);
            return;
        }


        console.debug('displaySweetAlert invoked:', { message, icon });

        Swal.fire({
            icon: icon,
            title: (icon === 'success' ? 'نجاح!' : 'خطأ!'),
            text: message,
            timer: 3000,
            showConfirmButton: false,
            toast: true,
            position: 'top'
        });
    }

    $(document).on("click", ".btn-dark", function (event) {
        event.preventDefault();

        const $btn = $(this);
        const $form = $btn.closest("form");


        const $emailInput = $form.find("#exampleInputEmail1, input[type='email']").first();
        const $passwordInput = $form.find("#exampleInputPassword1, #password, input[type='password']").first();

        const emailVal = $emailInput.length ? ($emailInput.val() || "") : "";
        const passwordVal = $passwordInput.length ? ($passwordInput.val() || "") : "";



        if (emailVal.trim() === "") {
            displaySweetAlert("⚠️  الرجاء إدخال البريد الإلكتروني   ", 'error');
            if ($emailInput.length) $emailInput.focus();
            return;
        }

        if (passwordVal.trim() === "") {
            displaySweetAlert("⚠️  الرجاء إدخال كلمة المرور", 'error');
            if ($passwordInput.length) $passwordInput.focus();
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailVal.trim())) {
            displaySweetAlert("❌ صيغة البريد الإلكتروني ليست صحيحة", 'error');
            if ($emailInput.length) $emailInput.focus();
            return;
        }


        displaySweetAlert("✅ تم التحقق بنجاح! جاري تسجيل الدخول...", 'success');
    });
});