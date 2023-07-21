const blogsReducer = (state = [], action) => {
    switch (action.type) {
      case 'INIT_BLOGS':
        return action.data;
      case 'CREATE_BLOG':
        return [...state, action.data];
      case 'UPDATE_BLOG':
        return state.map((blog) => (blog.id !== action.data.id ? blog : action.data));
      case 'DELETE_BLOG':
        return state.filter((blog) => blog.id !== action.data.id);
      default:
        return state;
    }
  };
  
  export const initializeBlogs = (blogs) => {
    return {
      type: 'INIT_BLOGS',
      data: blogs,
    };
  };
  
  export const createBlog = (blog) => {
    return {
      type: 'CREATE_BLOG',
      data: blog,
    };
  };
  
  export const updateBlog = (blog) => {
    return {
      type: 'UPDATE_BLOG',
      data: blog,
    };
  };
  
  export const deleteBlog = (id) => {
    return {
      type: 'DELETE_BLOG',
      data: { id },
    };
  };
  
  export default blogsReducer;
  