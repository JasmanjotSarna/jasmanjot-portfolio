// ===== CONTACT FORM =====

const SUPABASE_URL =
  "https://neqcnqrqjtkotcsylveg.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_a1AmHMpwF-TDlNJMJVo7cg_p6RnWp9W";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  // Form validation
  function validateForm(formData) {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message cannot be empty';
    } else if (formData.message.length < 10) {
      errors.message = 'Message should be at least 10 characters';
    }
    
    return errors;
  }

  const formMessage = document.getElementById('formMessage');

  // Show/hide form messages
  function showMessage(message, type) {
    if (!formMessage) return;

    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    formMessage.style.opacity = '1';
    formMessage.style.transition = 'opacity 0.3s ease';

    clearTimeout(showMessage.timeoutId);
    showMessage.timeoutId = setTimeout(() => {
      formMessage.style.opacity = '0';
    }, 5000);
  }

  // Handle form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: contactForm.elements['name'].value,
      email: contactForm.elements['email'].value,
      subject: contactForm.elements['subject'].value,
      message: contactForm.elements['message'].value
    };
    
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      showMessage('Please check your form for errors', 'error');
      return;
    }
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    try {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString(),
            user_agent: navigator.userAgent
          }
        ])
        .select();

      if (error) throw error;

      const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      showMessage(`✓ Message sent successfully! Saved at ${timestamp}`, 'success');
      contactForm.reset();

      submitBtn.textContent = '✓ Sent!';
      submitBtn.style.background = '#2ecc71';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 2000);
    } catch (error) {
      console.error(error);
      showMessage('Error sending message.', 'error');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  // Add input focus effects
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.borderColor = '#D4A017';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.borderColor = 'rgba(212, 160, 23, 0.2)';
    });
  });
}

// Fetch and display submitted responses
async function getSubmittedResponses() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log('📨 Submitted Responses:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching responses:', error);
    return null;
  }
}

// Optional: Listen for real-time updates
function subscribeToResponses() {
  supabase
    .channel('contacts')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'contacts' },
      (payload) => {
        console.log('✨ New submission received:', payload.new);
      }
    )
    .subscribe();
}

// Note: To enable actual email delivery:
// 1. Uncomment the action attribute in the form HTML
// 2. Use FormSpree (formspree.io) or EmailJS
// 3. Update the form submission handler above accordingly
