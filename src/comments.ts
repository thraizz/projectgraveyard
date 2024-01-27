import { addDoc, collection, getDocs } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

import { firestore } from "./firebase";
import { Comment } from "./types";

export const useCommentStore = defineStore("comments", () => {
  const comments = ref<Comment[]>([]);

  const fetchComments = () => {
    const commentCollection = collection(firestore, "comments");

    return getDocs(commentCollection)
      .then((querySnapshot) => {
        return querySnapshot.docs.map(
          (doc) =>
            ({
              _id: doc.id,
              ...doc.data(),
            }) as Comment,
        );
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);

        return [] as Comment[];
      });
  };

  const refetch = () => {
    fetchComments().then((data) => {
      comments.value = data;
    });
  };
  refetch();

  const getCommentsByProjectUid = (projectUid: string) => {
    return comments.value.filter((comment) => comment.projectId === projectUid);
  };

  const addCommentToProject = (
    comment: string,
    projectUid: string,
    userUid: string,
  ) => {
    const commentData = {
      userId: userUid,
      projectId: projectUid,
      textContent: comment,
      timestamp: new Date(),
      upvotes: [],
    };

    const commentCollection = collection(firestore, "comments");
    addDoc(commentCollection, {
      ...commentData,
      timestamp: commentData.timestamp.toISOString(),
    })
      .then((data) => {
        console.log(data);
        comments.value = [
          ...comments.value,
          { ...commentData, _id: data.id } as Comment,
        ];
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  // function upvoteProject(_id: string, uid?: string) {
  //   const project = comments.value.find((p) => p._id === _id);
  //   if (!project) return;
  //   const projectData = {
  //     ...project,
  //     upvotes: uid
  //       ? project.upvotes.includes(uid)
  //         ? project.upvotes.filter((projectUid) => projectUid !== uid)
  //         : [...project.upvotes, uid]
  //       : project.upvotes,
  //   };
  //   setDoc(doc(firestore, `projects/${_id}`), projectData)
  //     .then(() => {
  //       comments.value = comments.value.map((p) =>
  //         p._id === _id ? projectData : p,
  //       );
  //       // refetch();
  //     })
  //     .catch((error) => {
  //       console.error("Error writing document: ", error);
  //     });
  // }

  return {
    projects: comments,
    refetch,
    getCommentsByProjectUid,
    addCommentToProject,
  };
});
