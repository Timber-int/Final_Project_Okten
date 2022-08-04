import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';

import css from './ForPartnersPage.module.css';
import { partnersRequestValidator } from '../../validator';
import { createPartnersRequest } from '../../store';

const ForPartnersPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: joiResolver(partnersRequestValidator),
        mode: 'onTouched',
    });

    const dispatch = useDispatch();

    const submit = (data) => {
        dispatch(createPartnersRequest({ requestData: data }));
        reset();
    };

    return (
        <div className={css.container}>
            <div className={css.header}>
                For partners
            </div>
            <div className={css.text_content}>
                <div>Partnership in business is a good way to work together and get satisfaction from the outcome. Why? Because we offer partnership
                    in a modern, flexible and interesting company. This kind of cooperation benefits, financial opportunities, advertising and
                    business growth to both parties. This is more than just words because if you are on this page, you probably want your local
                    business to grow and develop.
                </div>
                <div>La Piec carries out pizza delivery in Ivano Frankivsk. It is a competitive and dynamic niche, which is rapidly changing and
                    expanding. We provide quality service and adhere to modern standards of work to meet the wishes of the most demanding client. At
                    the same time, we are loyal to our new partners and are ready to discuss details of cooperation today – fill in the contact form
                    below to get in touch and we will answer all your questions.
                </div>
                <div>We deliver pizza, salads, and drinks across Ivano Frankivsk, have a wide assortment, pleasant prices for our customers, quality
                    service and excellent conditions. “La Piec” cares about its customers and always chooses only the best for them. Ready to join and
                    feel that you have the resources and the desire? Contact us. Let’s start a new and promising partnership.
                </div>
                <div>This is a contact page for firms or individual entrepreneurs who can offer “La Piec” a profitable partnership. We are always open
                    to suggestions and dialogues, and we are always looking for trustworthy people in with their work, just like us.
                </div>
            </div>
            <div className={css.send_request}>Send request</div>
            <div className={css.form_container}>
                <form className={css.request_form} onSubmit={handleSubmit(submit)}>
                    <div className={css.errors_span}>{errors.name && <span>{errors.name.message}</span>}</div>
                    <div className={css.input_box}>
                        <input className={css.request_input} type="text" {...register('name')} required
                               placeholder={'Your name*'}/>
                    </div>
                    <div className={css.errors_span}>{errors.phone && <span>{errors.phone.message}</span>}</div>
                    <div className={css.input_box}>
                        <input className={css.request_input} type="phone" {...register('phone')} required
                               placeholder={'Your phone'}/>
                    </div>
                    <div className={css.errors_span}>{errors.email && <span>{errors.email.message}</span>}</div>
                    <div className={css.input_box}>
                        <input className={css.request_input} type="email" {...register('email')} required
                               placeholder={'Your email*'}/>
                    </div>
                    <div className={css.errors_span}>{errors.message && <span>{errors.message.message}</span>}</div>
                    <div className={css.input_box}>
                        <textarea className={css.request_input} rows={5} cols={15} {...register('message')} required
                                  placeholder={'Your message'}/>
                    </div>
                    <div className={css.input_box}><input className={css.send_button} type="submit" value={'Send'}/></div>
                </form>
            </div>
        </div>
    );
};

export { ForPartnersPage };
