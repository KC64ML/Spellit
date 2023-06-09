package com.urs.spellit.member.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity(name="friend_wait")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class FriendWaitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column
    private Long friendId;
    @Column
    private String friendEmail;
    @Column
    private Long myId;

    @ManyToOne
    @JoinColumn(name="member_id")
    @JsonIgnoreProperties({"friendWaitEntities", "friends"})
    @NonNull
    private Member member;

    public static FriendWaitEntity toBuild(Long myId, Member friend)
    {
        return FriendWaitEntity.builder()
                .myId(myId)
                .friendId(friend.getId())
                .friendEmail(friend.getEmail())
                .member(friend)
                .build();

    }
    public static FriendWaitEntity checkExistsInWaitList(List<FriendWaitEntity> friendWaitList, Long memberId)
    {
        for(FriendWaitEntity WaitFriend : friendWaitList)
        {
            if(WaitFriend.getFriendId()==memberId)
            {
                return WaitFriend;
            }
        }
        return null;
    }
}
