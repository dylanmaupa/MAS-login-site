// import React, { useState } from 'react';
// import './App.scss';

// const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKvwnUIeQ5OOFUdFY6CNsVDbIDhk03P6fvRGpdMoqgMpVf56fqnDIYfGP8rGgFpUQt/exec"; // <-- Replace this

// export default function App() {
//   const [form, setForm] = useState({ name: '', email: '', phone: '' });
//   const [status, setStatus] = useState('');

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new URLSearchParams();
//     formData.append("name", form.name);
//     formData.append("email", form.email);
//     formData.append("phone", form.phone);

//     try {
//       const response = await fetch(GOOGLE_SCRIPT_URL, {
//         method: "POST",
//         body: formData
//       });

//       const text = await response.text();
//       if (text === "success") {
//         setStatus("✅ Registered successfully!");
//         setForm({ name: '', email: '', phone: '' });
//       } else if (text === "duplicate") {
//         setStatus("⚠️ This user is already registered.");
//       } else {
//         setStatus("❌ Unknown error. Try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus("❌ Submission failed. Try again.");
//     }
//   };


//   return (
//     <div className='wrapper' style={{  }}>
//       <h2>Event Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         /><br /><br />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         /><br /><br />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={handleChange}
//           required
//         /><br /><br />
//         <button type="submit">Register</button>
//       </form>
//       <p>{status}</p>
//     </div>
//   );
// }


import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './App.scss';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKvwnUIeQ5OOFUdFY6CNsVDbIDhk03P6fvRGpdMoqgMpVf56fqnDIYfGP8rGgFpUQt/exec"; // <-- Replace this

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const formData = new URLSearchParams();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData
      });

      const text = await response.text();
      if (text === "success") {
        setStatus("✅ Registered successfully!");
        setForm({ name: '', email: '', phone: '' });
        Swal.fire('Success', '✅ Registered successfully!', 'success');
      } else if (text === "duplicate") {
        setStatus("⚠️ This user is already registered.");
        Swal.fire('Warning', '⚠️ This user is already registered.', 'warning');
      } else {
        setStatus("❌ Unknown error. Try again.");
        Swal.fire('Error', '❌ Unknown error. Try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Submission failed. Try again.");
      Swal.fire('Error', '❌ Submission failed. Try again.', 'error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='wrapper'>
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}