import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ReviewsSection = styled.div`
  padding: 60px 10px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 40px 5px;
  }
`;

const SectionTitle = styled.h2`
  color: #ffd700;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 15px;
  }
`;

const ReviewCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  padding: 20px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Stars = styled.div`
  color: #ffd700;
  margin-bottom: 15px;
  display: flex;
  gap: 5px;
`;

const ReviewText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ReviewerImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewerDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewerName = styled.span`
  font-weight: bold;
  color: #ffd700;
`;

const ReviewDate = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const CustomerReviews = () => {
  const { t } = useTranslation();

  const reviews = [
    {
      id: 1,
      rating: 5,
      text: t('reviews.reviewers.john.text'),
      name: t('reviews.reviewers.john.name'),
      date: t('reviews.reviewers.john.date'),
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      rating: 5,
      text: t('reviews.reviewers.maria.text'),
      name: t('reviews.reviewers.maria.name'),
      date: t('reviews.reviewers.maria.date'),
      image: "https://albaniatech.org/wp-content/uploads/2024/02/2024022210121586281-scaled-e1708598299330.jpeg"
    },
    {
      id: 3,
      rating: 5,
      text: t('reviews.reviewers.david.text'),
      name: t('reviews.reviewers.david.name'),
      date: t('reviews.reviewers.david.date'),
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQozVV6Zt-sjQlGFPrBvjoncuOpq7GRS3LYug&s"
    }
  ];

  return (
    <ReviewsSection>
      <SectionTitle>{t('reviews.title')}</SectionTitle>
      <ReviewsGrid>
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Stars>
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </Stars>
            <ReviewText>"{review.text}"</ReviewText>
            <ReviewerInfo>
              <ReviewerImage src={review.image} alt={review.name} />
              <ReviewerDetails>
                <ReviewerName>{review.name}</ReviewerName>
                <ReviewDate>{review.date}</ReviewDate>
              </ReviewerDetails>
            </ReviewerInfo>
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </ReviewsSection>
  );
};

export default CustomerReviews; 