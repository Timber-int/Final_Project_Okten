import React from 'react';
import css from './ContactsPage.module.css';
import { useSelector } from 'react-redux';
import { BsClock } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import { FaStreetView } from 'react-icons/fa';

const ContactsPage = () => {

    const city = localStorage.getItem('city');

    const { filterCityAddress } = useSelector(state => state['cityReducer']);

    return (
        <div className={css.container}>
            <div className={css.header}>
                Contact Information
            </div>
            <div className={css.clock_container}>
                <div className={css.clock_container_block}>
                    <div><span className={css.first_element}><FaCity/></span> <span>{city}</span></div>
                    <div><span className={css.first_element}><BsFillTelephoneFill/></span> <span>+380 111 11 11</span></div>
                </div>
                <hr/>
                <div className={css.open_time}><span className={css.first_element_clock}><BsClock/></span>
                    <span>Opening hours from 10:00 to 21:30</span></div>
            </div>
            <div className={css.header}>
                Our production
            </div>
            <div className={css.address_container}>
                {
                    filterCityAddress.length > 0 && filterCityAddress.map(address => (
                        <div className={css.address_box} key={address.id}>
                            <span className={css.street_element}><FaStreetView/></span>
                            <span>{address.addressName}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export { ContactsPage };
