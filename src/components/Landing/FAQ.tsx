import { Accordion, AccordionItem } from '@nextui-org/react';

const faqData = [
  {
    question: 'What is VPwallet?',
    answer:
      'If you need any help or if you have questions, you can send us an email or call us. Our support managers are always willing to help. You can also start your support request online by using our Frequently Asked Questions.',
  },
  {
    question: 'Why choose VPwallet?',
    answer:
      'VPwallet is a comprehensive digital wallet, connecting multiple payment methods simultaneously. VPwallet provides you with the highest level of security, offering you a unique way to make secure and quick online payments. VPwallet helps you have better control over your spending and/or your budget. The wallet is easy to use and the registration is quick and simple. Sign up today for FREE.',
  },
  {
    question: 'Is my VPwallet account a bank account?',
    answer:
      'No. VPwallet is a digital wallet giving you the flexibility and convenience to pay with your available funds.',
  },
  {
    question: 'How do I sign up for a VPwallet account?',
    answer:
      'The sign-up process is a simple and easy 2-step process: Step 1: Complete the registration form. Step 2: Verify the account by clicking on the link provided in the email. Please contact customer support in case you did not receive the verification link.',
  },
  {
    question: 'Who can open a VPwallet account?',
    answer:
      'Any natural person 18 years or the age of legal capacity in the jurisdiction of their residence can open a wallet account, whichever is higher.',
  },
  {
    question: 'What do I need to open an account with VPwallet?',
    answer:
      'To open an account with VPwallet, you need: an active email address; to be 18 years old or the age of legal capacity in the jurisdiction of your residence, whichever is higher; to be from an accepted country.',
  },
  {
    question: 'Can I register more than one account?',
    answer: 'No. You are allowed to have only one wallet account.',
  },
  {
    question: 'How can I log in to my account?',
    answer:
      'Click on sign in on the VPwallet website. Enter the email address you provided during sign up. Enter the password you chose during sign up.',
  },
  {
    question: 'How do I reset my VPwallet password?',
    answer: 'Go to VPwallet.io. Click on the upper right corner on «My Account». Click on «Change Password» tab.',
  },
  {
    question: 'My email and password are both correct, but I still can’t log in. Why not?',
    answer:
      'Having difficulties logging in with the correct email address and password may be due to the following reasons: You have not completed the sign-up process. You have not completed the verification process, meaning that you have not clicked on the verification link you received to your registered email address. In this case, please check your email inbox and complete the verification process. Your account has been blocked due to too many login attempts using the incorrect password, in which case you need to contact customer support in order to unlock your account.',
  },
  {
    question:
      'I have received an email that states that my account has been locked due to multiple failed sign-in attempts not made by me. What should I do?',
    answer:
      'Any natural person 18 years or the age of legal capacity in the jurisdiction of their residence can open a wallet account, whichever is higher.',
  },
];

const FAQ = () => (
  <section className="flex max-w-screen-xl flex-col items-center gap-4 p-5 md:p-16">
    <h3 className="text-center text-3xl font-bold sm:text-4xl"> VPwallet support</h3>
    <p className="max-w-[760px] text-center sm:mb-8">
      If you need any help or if you have questions, you can send us an email or call us. Our support managers are
      always willing to help. You can also start your support request online by using our
      <strong className="ml-1 text-tenant-main">Frequently Asked Questions.</strong>
    </p>
    <Accordion>
      {faqData.map((faq, index) => (
        <AccordionItem key={index} title={faq.question}>
          {faq.answer}
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FAQ;
