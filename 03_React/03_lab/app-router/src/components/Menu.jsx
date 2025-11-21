import { Link } from "react-router";

export default function Menu() {

    const menu = [
        { id: 1, 
          title: 'Home',
          path: '/'
        },
        { id: 2, 
          title: 'About',
          path: '/about'
        },
        { id: 3,
          title: 'Profile',
          path: '/profile',
          submenu: [
            {
                id: 3.1,
                title: 'Setting',
                path: '/profile/settings'
            }
          ]
        },
        { id: 4, 
          title: 'Login',
          path: '/login'
        }
    ];
  

    return (
        <div className="header">
            <ul className="nav">
                {menu.map((item) => (
                    <li key={item.id}>
                        <Link to={item.path}>{item.title}</Link>
                        {item.submenu && (
                            <ul className="submenu">
                                {item.submenu.map((subitem) => (
                                    <li key={subitem}>
                                        <Link to={subitem.path}>{subitem.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}