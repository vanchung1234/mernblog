import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../contexts/constant';
export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${apiUrl}/categories`);
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ADMIN</span>
        <img
          style={{ width: '236px' }}
          src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.6435-9/180890931_3017350898502095_3663663425670347705_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=ty_J_cC1EVIAX_GDfbh&_nc_ht=scontent.fhan1-1.fna&oh=00_AT_9BXVLELxxJ3ryhsv3AO3F1Hvj4bm7vldR5dvBGbbCcg&oe=61DD00B6"
          alt=""
        />
        <p>Siêu cấp đẹp zai</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link
              to={`/?categories=${c.name}`}
              className="link"
            >
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
