import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetContactsQuery, useAddContactMutation } from '../features/graphqlApi';

const contactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', mobileNumber: '' });
  const [errors, setErrors] = useState({});
  const { data: contactData, error: contactError, isLoading: contactsLoading } = useGetContactsQuery()
  const [addContact, { isLoading: addingContact }] = useAddContactMutation()

  const validationSchema = {
    name: { required: true, message: 'Name is required.' },
    email: {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Enter a valid email address.'
    },
    mobileNumber: {
      required: true,
      pattern: /^\d{10}$/,
      message: 'Enter a valid 10-digit mobile number.'
    },
    message: { required: true, message: 'Message is required.' }
  };

  const validate = (values) => {
    const validationErrors = {};
    for (const field in validationSchema) {
      const rule = validationSchema[field];
      const value = values[field] || '';

      if (rule.required && !value.trim()) {
        validationErrors[field] = rule.message;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        validationErrors[field] = rule.message;
      }
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        await addContact(formData).unwrap()
        setFormData({ name: '', email: '', message: '', mobileNumber: '' })
        navigate('/thank-you');
      } catch (error) {
        console.error('Error:', error)
        alert('Error saving contact')
      }
    }
  };

  const contacts = contactData?.contacts ?? []

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    aria-describedby="emailHelp"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>

               <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    type="number"
                    className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    aria-describedby="mobileNumberHelp"
                    min="1000000000"
                    max="9999999999"
                  />
                  {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows="5"
                  />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={addingContact}>
                  {addingContact ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6">
            <h3 className="mt-4">Saved Contacts</h3>
            {contactsLoading ? (
              <p>Loading contacts...</p>
            ) : contactError ? (
              <p className="text-danger">Unable to load contacts.</p>
            ) : contacts.length === 0 ? (
              <p>No saved contacts yet.</p>
            ) : (
              <div className="list-group" style={ { maxHeight: '300px', overflowY: 'scroll' } }>
                {contacts.map((contact) => (
                   <div key={contact.id} className="list-group-item">
                    <strong>{contact.name}</strong>
                    <p className="mb-1">{contact.email}</p>
                    <p className="mb-1">{contact.mobileNumber}</p>
                    <small>{contact.message}</small>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}


export default contactForm;