import './App.css'
import Card from './card'

const data = [
  {
    img: "https://media.techmaster.vn/api/static/OH6Sopmw/ZZHJz2jg",
    title: "10 lỗi sai thường gặp trong CSS",
    description:
      "Cascading Style Sheet (CSS) là một trong những trang quan trọng nhất trong phát triển web, giúp các trang web trở nên rõ ràng và hấp dẫn hơn. Trong bài viết này sẽ giải thích về một số sai lầm mà những người mới bắt đầu với CSS có thể mắc phải khi viết các thuộc tính CSS và tạo kiểu code.",
    seen: 24,
    releaseDate: "18-06-2023",
  },
  {
    img: "https://media.techmaster.vn/api/static/OH6Sopmw/sIOqUIv-",
    title: "Khám phá cách sử dụng useState trong React",
    description:
      "Để minh họa tầm quan trọng của việc này, hãy tạo một ứng dụng React đơn giản. Bạn có thể sử dụng Create React App hoặc Vite, tùy thuộc vào sở thích của bạn.",
    seen: 28,
    releaseDate: "18-06-2023",
  },
  {
    img: "https://media.techmaster.vn/api/static/bub3enc51co7s932dsk0/g3VUOWWt",
    title:
      "Techmaster vươn ra Nhật Bản. DAIUN và TECHMASTER hợp tác đào tạo và tuyển dụng IT",
    description:
      "Bấy lâu nay, Techmaster vẫn hợp tác cùng với nhiều doanh nghiệp trong nước để mở rộng cơ hội việc làm cho học viên sau khi học xong ở tất cả các khóa học.",
    seen: 165,
    releaseDate: "16-06-2023",
  },
];

const CardContainer = ({data}) => {
  const cardElements = data.map(cardInfo => {
    return<Card 
      img={cardInfo.img} 
      title={cardInfo.title}
       description={cardInfo.description} 
       seen={cardInfo.seen} 
       releaseDate={cardInfo.releaseDate}
    />
  });

  return <div className='container'>
    {cardElements}
  </div>
}

function App() {
  return (
    <>
      <CardContainer data={data} />
    </>
  )
}

export default App
