import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LoginSVG } from '../../images/icons/main/login.svg';
import { ReactComponent as LogoutSVG } from '../../images/icons/main/logout.svg';
import { ReactComponent as PhoneSVG } from '../../images/icons/main/calls.svg';
import { ReactComponent as EmailSVG } from '../../images/icons/main/messages.svg';
import { ReactComponent as UnwrapSVG } from '../../images/icons/main/unwrap.svg';
import { ReactComponent as WrapSVG } from '../../images/icons/main/wrap.svg';

import avatar from '../../images/avatar.png';
import styles from './profile.module.scss';
import { mockUser } from "../../utils/moks";

const Profile: FC = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false)
  return (
    <div className={styles.profile} onMouseEnter={(e) => setShowProfile(true)} onMouseLeave={(e) => setShowProfile(false)}>
      <div className={styles.profile__icon}>
        <img src={avatar} alt="" />
        {showProfile ?
          <WrapSVG />
          :
          <UnwrapSVG />
        }
      </div>
      <div className={styles.profile__content}>
        <div className={styles.profile__user_info}>
          <h2 className={styles.profile__user_name}>{`${mockUser.surname} ${mockUser.name}`}</h2>
          <Link to='/login' className="out">
            <LogoutSVG className="icon-default" />
          </Link>
          <p>{mockUser.position} &#160;&#8226;&#160; {mockUser.city}</p>
        </div>
        <div className={styles.profile__user_contacts}>
          <div className={styles.profile__user_contact}>
            <PhoneSVG />
            <div className="number">{mockUser.phone}</div>
          </div>
          <div className={styles.profile__user_contact}>
            <EmailSVG />
            <div className="mail">{mockUser.email}</div>
          </div>
        </div>
        <ul className={styles.profile__employees}>
          <li className={styles.profile__employees_group}>
            <h3 className={styles.profile__employees_title}>Операторы</h3>
            <ul className={styles.profile__employees_list}>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Мирон Батонов</p>
                <LoginSVG  className="icon-default" />
              </li>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Алексей Ильин</p>
                <LoginSVG  className="icon-default" />
              </li>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Милана Константинопольская</p>
                <LoginSVG  className="icon-default" />
              </li>
            </ul>
          </li>
          <li className={styles.profile__employees_group}>
            <h3 className={styles.profile__employees_title}>Логисты</h3>
            <ul className={styles.profile__employees_list}>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Александра Сизых</p>
                <LoginSVG  className="icon-default" />
              </li>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Илья Алексеев</p>
                <LoginSVG  className="icon-default" />
              </li>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Владимир Петров</p>
                <LoginSVG  className="icon-default" />
              </li>
            </ul>
          </li>
          <li className={styles.profile__employees_group}>
            <h3 className={styles.profile__employees_title}>Бухгалтеры</h3>
            <ul className={styles.profile__employees_list}>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Полина Калинина</p>
                <LoginSVG  className="icon-default" />
              </li>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Наталья Натальева</p>
                <LoginSVG  className="icon-default" />
              </li>
              <li className={styles.profile__employee}>
                <img src={avatar} />
                <p>Константин Константинопольский</p>
                <LoginSVG  className="icon-default" />
              </li>
            </ul>
          </li>
        </ul>
      </div >
    </div >
  )
}

export default Profile